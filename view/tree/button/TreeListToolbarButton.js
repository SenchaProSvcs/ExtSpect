Ext.define( 'uxExtSpect.view.tree.button.TreeListToolbarButton',
	{   extend: 'uxExtSpect.view.ExtSpectToolbarButton',

		showInstances: function () {
			this.fetchParentNavigationView().showInstances = true;
			this.fetchDataList().computeAndSetData();
		},

		showClassesOnly: function () {
			this.fetchParentNavigationView().showInstances = false;
			this.fetchDataList().computeAndSetData();
		},

		showContainersOnly: function () {
			this.fetchParentNavigationView().showComponents = false;
			this.fetchDataList().computeAndSetData();
		},

		showAllComponents: function () {
			this.fetchParentNavigationView().showComponents = true;
			this.fetchDataList().computeAndSetData();
		},
		showListing: function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.showListing = true;
			navigationView.showIndented = false;
			navigationView.dataListStoreName = 'uxExtSpect.store.tree.ListingStore';
			this.fetchDataList().computeAndSetData();
		},

		showIndented: function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.showListing = false;
			navigationView.showIndented = true;
			navigationView.dataListStoreName = 'uxExtSpect.store.tree.TreeListStore';
			this.fetchDataList().computeAndSetData();
		},

		showTree: function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.showListing = false;
			navigationView.showIndented = false;
			navigationView.dataListStoreName = 'uxExtSpect.store.tree.TreeListStore';
			this.fetchDataList().computeAndSetData();
		}
	}
);
