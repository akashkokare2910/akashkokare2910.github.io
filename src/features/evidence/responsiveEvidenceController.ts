export const responsiveEvidenceController = String.raw`
(() => {
  const compactViewport = window.matchMedia("(max-width: 900px)");
  const disclosures = document.querySelectorAll("details[data-responsive-evidence]");
  const syncDisclosureState = () => {
    disclosures.forEach((disclosure) => {
      disclosure.open = !compactViewport.matches;
    });
  };

  syncDisclosureState();
  compactViewport.addEventListener("change", syncDisclosureState);
})();
`;
