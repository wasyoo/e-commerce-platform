export const reactTableConfig =  {
  filterable: true,
  defaultPageSize: 10,
  noDataText: "Il n'y a pas de données pour le moment",
  previousText: 'Précédent',
  nextText: 'Suivant',
  loadingText: 'Chargement...',
  rowsText: 'lignes',
  ofText: 'de',
};


export const localizationFr = {
  pagination: {
    labelDisplayedRows: '{from}-{to} de {count}', // {from}-{to} of {count}
    labelRowsPerPage: 'Lignes par page:', // Rows per page:
    firstAriaLabel: 'Première page', // First Page
    firstTooltip: 'Première page', // First Page
    previousAriaLabel: 'Précédent', // Previous Page
    previousTooltip: 'Précédent', // Previous Page
    nextAriaLabel: 'Suivant', // Next Page
    nextTooltip: 'Suivant', // Next Page
    lastAriaLabel: 'Dernière page', // Last Page
    lastTooltip: 'Dernière page', // Last Page
  },
  toolbar: {
    nRowsSelected: '{0} ligne (s) sélectionnée (s)', // {0} row(s) selected
    showColumnsTitle: 'Afficher les colonnes', // Show Columns
    showColumnsAriaLabel: 'Afficher les colonnes', // Show Columns
    exportTitle: 'Exporter', // Export
    exportAriaLabel: 'Exporter', // Export
    exportName: 'Exporter au format CSV', // Export as CSV
    searchTooltip: 'Recherche', // Search
  },
  header: {
    actions: 'Actions', // Actions
  },
  body: {
    emptyDataSourceMessage: 'Il n\'y a pas de données pour le moment', // No records to display
    filterRow: {
      filterTooltip: 'Filtre', // Filter
    },
  },
};
