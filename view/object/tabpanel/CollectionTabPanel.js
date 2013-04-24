Ext.define( 'ux.extspect.view.object.tabpanel.CollectionTabPanel',
	{  extend : 'ux.extspect.view.ExtSpectTabPanel',
		xtype : 'collectiontabpanel',
		isCollectionTabPanel : true,

		config : {
			items : [
				{  title : 'Items',
					items : { xtype : 'arraylist' }
				} ,
				{  title : 'All',
					items : { xtype : 'arraylist' }
				} ,
				{  title : 'Properties',
					items : [
						{ xtype : 'extpropertieslist' } ,
						{ xtype : 'propertieslisttoolbar' }
					]
				} ,
				{  title : 'Internal',
					items : [
						{ xtype : 'internallist' } ,
						{ xtype : 'propertieslisttoolbar' }
					]
				} ,
				{  title : 'Methods',
					items : [
						{ xtype : 'methodlist' } ,
						{ xtype : 'methodslisttoolbar' }
					]
				}
			]
		}
	}
);
