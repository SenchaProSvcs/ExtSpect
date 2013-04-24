Ext.define( 'ux.extspect.store.object.property.GroupedPropertiesListStore',
	{     extend : 'ux.extspect.store.object.property.PropertiesListStore',
		config : { groupField : "group", sorters : ["id" , "group"] }
	}
);
