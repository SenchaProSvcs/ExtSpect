Ext.define( 'ux.extspect.view.tree.button.TreeListToolbarButton',
	{   extend : 'ux.extspect.view.ExtSpectToolbarButton',

		showInstances : function () {
			this.fetchParentNavigationView().showInstances = true;
			this.fetchDataList().computeAndSetData();
		},

		showNoInstances : function () {
			this.fetchParentNavigationView().showInstances = false;
			this.fetchDataList().computeAndSetData();
		},

		showNoListeners : function () {
			this.fetchParentNavigationView().showListeners = false;
			this.fetchDataList().computeAndSetData();
		},

		showListeners : function () {
			this.fetchParentNavigationView().showListeners = true;
			this.fetchDataList().computeAndSetData();
		},

		showListing : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.showListing = true;
			navigationView.dataListStoreName = 'ux.extspect.store.tree.ListingStore';
			this.fetchDataList().computeAndSetData();
		},

		showTree : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.showListing = false;
			navigationView.dataListStoreName = 'ux.extspect.store.tree.TreeListStore';
			this.fetchDataList().computeAndSetData();
		}
	}
);
