# Retained landing design

`LandingPage.tsx`, LandingPageButtons, and TermsAndConditions retain the previous
marketing composition. They are not rendered by the current `/` route.
LandingPageButtons still uses the legacy OIDC context and preview AppLink, so it
is not part of the presentation-only React handoff.
