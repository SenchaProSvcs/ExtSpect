Ext.define( 'extspect.store.object.property.GroupedPropertiesListStore',
	{     extend : 'extspect.store.object.property.PropertiesListStore',
		config : { groupField : "group", sorters : ["id" , "group"] }
	}
);
