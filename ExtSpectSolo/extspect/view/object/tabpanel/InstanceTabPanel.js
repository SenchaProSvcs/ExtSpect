Ext.define( 'extspect.view.object.tabpanel.InstanceTabPanel',
	{  extend : 'extspect.view.ExtSpectTabPanel',
		xtype : 'instancetabpanel',
		requires : [
			'extspect.view.object.datalist.property.MethodsList' ,
			'extspect.view.object.toolbar.PropertiesListToolbar' ,
			'extspect.view.object.toolbar.MethodsListToolbar'
		],

		config : { title : StringOf.to$( Ext.Viewport ),
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
