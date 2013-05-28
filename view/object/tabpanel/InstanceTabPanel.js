Ext.define( 'uxExtSpect.view.object.tabpanel.InstanceTabPanel',
	{  extend: 'uxExtSpect.view.ExtSpectTabPanel',
		xtype: 'instancetabpanel',
		requires: [
			'uxExtSpect.view.object.datalist.property.MethodsList' ,
			'uxExtSpect.view.object.toolbar.PropertiesListToolbar' ,
			'uxExtSpect.view.object.toolbar.MethodsListToolbar'
		],

		config: { title: uxExtSpect.util.StringOf.to$( Ext.Viewport ),
			// TODO: what if Ext.Viewport is not the first object shown at startup?
			// 'Inspector Panel' , // this must be longish for setNavigationViewTitle to work

			items: [
				{  title: 'Properties',
					items: [
						{ xtype: 'propertieslist' } ,
						{ xtype: 'propertieslisttoolbar' }
					]
				} ,
				{  title: 'Internal',
					items: [
						{ xtype: 'internallist' } ,
						{ xtype: 'propertieslisttoolbar' }
					]
				} ,
				{  title: 'Methods',
					items: [
						{ xtype: 'methodlist' } ,
						{ xtype: 'methodslisttoolbar' }
					]
				}
			]
		}
	}
);
