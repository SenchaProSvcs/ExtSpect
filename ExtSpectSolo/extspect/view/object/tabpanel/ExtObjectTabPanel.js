Ext.define( 'extspect.view.object.tabpanel.ExtObjectTabPanel',
	{  extend : 'extspect.view.object.tabpanel.InstanceTabPanel',
		xtype : 'extobjecttabpanel',

		requires : [
			'extspect.view.object.datalist.property.ExtPropertiesList' ,
			'extspect.view.object.datalist.property.InternalList' ,
			'extspect.view.object.datalist.property.MethodsList'
		],

		config : {    items : [
			{  title : "Properties",
				items : [
					{ xtype : 'extpropertieslist' } ,
					{ xtype : 'propertieslisttoolbar' }
				]
			} ,
			// only need this if the object has internal props, and for internal configs
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
