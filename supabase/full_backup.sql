

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."compute_contract_agreements_table_row_hash"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  previous_hash text;
  new_hash text;
BEGIN
  SELECT row_hash INTO previous_hash FROM contract_agreements ORDER BY agreed_at DESC, id DESC LIMIT 1;
  IF previous_hash IS NULL THEN
    previous_hash := '0';
  END IF;
  new_hash := encode(digest(
    COALESCE(NEW.contract_id::text, '') ||
    COALESCE(NEW.contract_version_id::text, '') ||
    COALESCE(NEW.contract_version_row_hash::text, '') ||
    COALESCE(NEW.contract_requirement_id::text, '') ||
    COALESCE(NEW.user_id::text, '') ||
    COALESCE(NEW.ip_address::text, '') ||
    COALESCE(NEW.user_agent::text, '') ||
    COALESCE(NEW.agreed_at::text, '') || previous_hash, 'sha256'), 'hex');
  NEW.row_hash := new_hash;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."compute_contract_agreements_table_row_hash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_contract_versions_table_row_hash"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  previous_hash text;
  new_hash text;
BEGIN
  SELECT row_hash INTO previous_hash FROM contract_versions WHERE contract_id = NEW.contract_id ORDER BY created_at DESC, id DESC LIMIT 1;
  IF previous_hash IS NULL THEN
    previous_hash := '0';
  END IF;
  new_hash := encode(digest(
    COALESCE(NEW.contract_id::text, '') ||
    COALESCE(NEW.content::text, '') || previous_hash, 'sha256'), 'hex');
  NEW.row_hash := new_hash;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."compute_contract_versions_table_row_hash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_pending_payment_events_table_row_hash"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  previous_hash text;
  new_hash text;
BEGIN
  SELECT row_hash INTO previous_hash FROM pending_payment_events ORDER BY created_at DESC, id DESC LIMIT 1;
  IF previous_hash IS NULL THEN
    previous_hash := '0';
  END IF;
  new_hash := encode(digest(
    COALESCE(NEW.pending_payment_id::text, '') ||
    COALESCE(NEW.event_type::text, '') ||
    COALESCE(NEW.moov_transfer_id::text, '') ||
    COALESCE(NEW.reason::text, '') || previous_hash, 'sha256'), 'hex');
  NEW.row_hash := new_hash;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."compute_pending_payment_events_table_row_hash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_pending_payments_table_row_hash"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  previous_hash text;
  new_hash text;
BEGIN
  SELECT row_hash INTO previous_hash FROM pending_payments ORDER BY created_at DESC, id DESC LIMIT 1;
  IF previous_hash IS NULL THEN
    previous_hash := '0';
  END IF;
  new_hash := encode(digest(
    COALESCE(NEW.source_account_id::text, '') ||
    COALESCE(NEW.destination_account_id::text, '') ||
    COALESCE(NEW.amount_to_transfer::text, '') ||
    COALESCE(NEW.platform_fee::text, '') ||
    COALESCE(NEW.payment_method_id::text, '') ||
    COALESCE(NEW.note::text, '') || previous_hash, 'sha256'), 'hex');
  NEW.row_hash := new_hash;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."compute_pending_payments_table_row_hash"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, first_name, last_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    -- Split the full_name to get the first name
    SPLIT_PART(new.raw_user_meta_data->>'full_name', ' ', 1),
    -- Split the full_name to get the last name
    SUBSTRING(new.raw_user_meta_data->>'full_name' FROM POSITION(' ' IN new.raw_user_meta_data->>'full_name') + 1),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_update_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.profiles
  SET
    full_name = new.raw_user_meta_data->>'full_name',
    first_name = SPLIT_PART(new.raw_user_meta_data->>'full_name', ' ', 1),
    last_name = SUBSTRING(new.raw_user_meta_data->>'full_name' FROM POSITION(' ' IN new.raw_user_meta_data->>'full_name') + 1),
    avatar_url = new.raw_user_meta_data->>'avatar_url'
  WHERE id = new.id;
  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_update_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reject_update_delete_on_contract_agreements"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletes are not allowed on the contract_agreements table';
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."reject_update_delete_on_contract_agreements"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reject_update_delete_on_contract_versions"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletes are not allowed on the contract_versions table';
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."reject_update_delete_on_contract_versions"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reject_update_delete_on_pending_payment_events"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletes are not allowed on the pending_payment_events table';
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."reject_update_delete_on_pending_payment_events"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reject_update_delete_on_pending_payments"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletes are not allowed on the pending_payments table';
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."reject_update_delete_on_pending_payments"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "moov_account_id" "text"
);


ALTER TABLE "public"."accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contract_agreements" (
    "id" "text" NOT NULL,
    "contract_id" "text" NOT NULL,
    "contract_version_id" "text" NOT NULL,
    "contract_version_row_hash" "text" NOT NULL,
    "contract_requirement_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "ip_address" "text" NOT NULL,
    "user_agent" "text" NOT NULL,
    "agreed_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "row_hash" "text" NOT NULL
);


ALTER TABLE "public"."contract_agreements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contract_requirements" (
    "id" "text" NOT NULL,
    "pending_payment_id" "text" NOT NULL,
    "contract_id" "text" NOT NULL
);


ALTER TABLE "public"."contract_requirements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contract_versions" (
    "id" "text" NOT NULL,
    "contract_id" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "row_hash" "text" NOT NULL
);


ALTER TABLE "public"."contract_versions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contracts" (
    "id" "text" NOT NULL,
    "owner_user_id" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."contracts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."feedback" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text",
    "rating" smallint,
    "message" "text"
);


ALTER TABLE "public"."feedback" OWNER TO "postgres";


ALTER TABLE "public"."feedback" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."feedback_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."pending_payment_events" (
    "id" "text" NOT NULL,
    "pending_payment_id" "text" NOT NULL,
    "event_type" "text" NOT NULL,
    "moov_transfer_id" "text",
    "reason" "text",
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "row_hash" "text" NOT NULL,
    CONSTRAINT "pending_payment_events_event_type_check" CHECK (("event_type" = ANY (ARRAY['cancel'::"text", 'transfer'::"text"])))
);


ALTER TABLE "public"."pending_payment_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pending_payments" (
    "id" "text" NOT NULL,
    "source_account_id" "text" NOT NULL,
    "destination_account_id" "text" NOT NULL,
    "amount_to_transfer" integer NOT NULL,
    "platform_fee" integer NOT NULL,
    "payment_method_id" "text" NOT NULL,
    "note" "text",
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "row_hash" "text" NOT NULL
);


ALTER TABLE "public"."pending_payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "phone_number" "text",
    "first_name" "text",
    "last_name" "text",
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "email" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."contract_agreements"
    ADD CONSTRAINT "contract_agreements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contract_requirements"
    ADD CONSTRAINT "contract_requirements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contract_versions"
    ADD CONSTRAINT "contract_versions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pending_payment_events"
    ADD CONSTRAINT "pending_payment_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pending_payments"
    ADD CONSTRAINT "pending_payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_phone_number_key" UNIQUE ("phone_number");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



CREATE OR REPLACE TRIGGER "no_update_or_delete_contract_agreements" BEFORE DELETE OR UPDATE ON "public"."contract_agreements" FOR EACH ROW EXECUTE FUNCTION "public"."reject_update_delete_on_contract_agreements"();



CREATE OR REPLACE TRIGGER "no_update_or_delete_contract_versions" BEFORE DELETE OR UPDATE ON "public"."contract_versions" FOR EACH ROW EXECUTE FUNCTION "public"."reject_update_delete_on_contract_versions"();



CREATE OR REPLACE TRIGGER "no_update_or_delete_pending_payment_events" BEFORE DELETE OR UPDATE ON "public"."pending_payment_events" FOR EACH ROW EXECUTE FUNCTION "public"."reject_update_delete_on_pending_payment_events"();



CREATE OR REPLACE TRIGGER "no_update_or_delete_pending_payments" BEFORE DELETE OR UPDATE ON "public"."pending_payments" FOR EACH ROW EXECUTE FUNCTION "public"."reject_update_delete_on_pending_payments"();



CREATE OR REPLACE TRIGGER "set_row_hash_contract_agreements" BEFORE INSERT ON "public"."contract_agreements" FOR EACH ROW EXECUTE FUNCTION "public"."compute_contract_agreements_table_row_hash"();



CREATE OR REPLACE TRIGGER "set_row_hash_contract_versions" BEFORE INSERT ON "public"."contract_versions" FOR EACH ROW EXECUTE FUNCTION "public"."compute_contract_versions_table_row_hash"();



CREATE OR REPLACE TRIGGER "set_row_hash_pending_payment_events" BEFORE INSERT ON "public"."pending_payment_events" FOR EACH ROW EXECUTE FUNCTION "public"."compute_pending_payment_events_table_row_hash"();



CREATE OR REPLACE TRIGGER "set_row_hash_pending_payments" BEFORE INSERT ON "public"."pending_payments" FOR EACH ROW EXECUTE FUNCTION "public"."compute_pending_payments_table_row_hash"();



ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."contract_agreements"
    ADD CONSTRAINT "contract_agreements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "fk_user" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can delete their own feedback." ON "public"."feedback" FOR DELETE USING (("auth"."uid"() = ( SELECT "profiles"."id"
   FROM "public"."profiles"
  WHERE ("profiles"."email" = "feedback"."email"))));



CREATE POLICY "Users can submit feedback." ON "public"."feedback" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Users can update their own feedback." ON "public"."feedback" FOR UPDATE USING (("auth"."uid"() = ( SELECT "profiles"."id"
   FROM "public"."profiles"
  WHERE ("profiles"."email" = "feedback"."email"))));



CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own feedback." ON "public"."feedback" FOR SELECT USING (("auth"."uid"() = ( SELECT "profiles"."id"
   FROM "public"."profiles"
  WHERE ("profiles"."email" = "feedback"."email"))));



ALTER TABLE "public"."feedback" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."compute_contract_agreements_table_row_hash"() TO "anon";
GRANT ALL ON FUNCTION "public"."compute_contract_agreements_table_row_hash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_contract_agreements_table_row_hash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_contract_versions_table_row_hash"() TO "anon";
GRANT ALL ON FUNCTION "public"."compute_contract_versions_table_row_hash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_contract_versions_table_row_hash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_pending_payment_events_table_row_hash"() TO "anon";
GRANT ALL ON FUNCTION "public"."compute_pending_payment_events_table_row_hash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_pending_payment_events_table_row_hash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_pending_payments_table_row_hash"() TO "anon";
GRANT ALL ON FUNCTION "public"."compute_pending_payments_table_row_hash"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_pending_payments_table_row_hash"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_update_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_update_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_update_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_agreements"() TO "anon";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_agreements"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_agreements"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_versions"() TO "anon";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_versions"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_contract_versions"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payment_events"() TO "anon";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payment_events"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payment_events"() TO "service_role";



GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payments"() TO "anon";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payments"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."reject_update_delete_on_pending_payments"() TO "service_role";


















GRANT ALL ON TABLE "public"."accounts" TO "anon";
GRANT ALL ON TABLE "public"."accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."accounts" TO "service_role";



GRANT ALL ON TABLE "public"."contract_agreements" TO "anon";
GRANT ALL ON TABLE "public"."contract_agreements" TO "authenticated";
GRANT ALL ON TABLE "public"."contract_agreements" TO "service_role";



GRANT ALL ON TABLE "public"."contract_requirements" TO "anon";
GRANT ALL ON TABLE "public"."contract_requirements" TO "authenticated";
GRANT ALL ON TABLE "public"."contract_requirements" TO "service_role";



GRANT ALL ON TABLE "public"."contract_versions" TO "anon";
GRANT ALL ON TABLE "public"."contract_versions" TO "authenticated";
GRANT ALL ON TABLE "public"."contract_versions" TO "service_role";



GRANT ALL ON TABLE "public"."contracts" TO "anon";
GRANT ALL ON TABLE "public"."contracts" TO "authenticated";
GRANT ALL ON TABLE "public"."contracts" TO "service_role";



GRANT ALL ON TABLE "public"."feedback" TO "anon";
GRANT ALL ON TABLE "public"."feedback" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback" TO "service_role";



GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pending_payment_events" TO "anon";
GRANT ALL ON TABLE "public"."pending_payment_events" TO "authenticated";
GRANT ALL ON TABLE "public"."pending_payment_events" TO "service_role";



GRANT ALL ON TABLE "public"."pending_payments" TO "anon";
GRANT ALL ON TABLE "public"."pending_payments" TO "authenticated";
GRANT ALL ON TABLE "public"."pending_payments" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
