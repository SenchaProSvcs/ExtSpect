Ext.define( 'ux.extspect.view.object.button.PropertiesListToolbarButton',
	{  extend : 'ux.extspect.view.ExtSpectToolbarButton',

		showAllProperties : function () {
			this.fetchParentNavigationView().showOnlyOwnProperties = false;
			this.fetchDataList().computeAndSetData();
		},

		showOwnProperties : function () {
			this.fetchParentNavigationView().showOnlyOwnProperties = true;
			this.fetchDataList().computeAndSetData();
		},

		sortByGroup : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.isDataListGrouped = true;
			navigationView.dataListStoreName =
				'ux.extspect.store.object.property.GroupedPropertiesListStore';
			this.fetchDataList().computeAndSetData();
		},

		sortAlphabetically : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.isDataListGrouped = false;
			navigationView.dataListStoreName = 'ux.extspect.store.object.property.PropertiesListStore';
			this.fetchDataList().computeAndSetData();
		}
	}
);
