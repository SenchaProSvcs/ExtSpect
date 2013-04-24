Ext.define( 'ux.extspect.view.object.tabpanel.InstanceTabPanel',
	{  extend : 'ux.extspect.view.ExtSpectTabPanel',
		xtype : 'instancetabpanel',
		requires : [
			'ux.extspect.view.object.datalist.property.MethodsList' ,
			'ux.extspect.view.object.toolbar.PropertiesListToolbar' ,
			'ux.extspect.view.object.toolbar.MethodsListToolbar'
		],

		config : { title : ux.extspect.util.StringOf.to$( Ext.Viewport ),
			// TODO: what if Ext.Viewport is not the first object shown at startup?
			// 'Inspector Panel' , // this must be longish for setNavigationViewTitle to work

			items : [
				{  title : 'Properties',
					items : [
						{ xtype : 'propertieslist' } ,
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
