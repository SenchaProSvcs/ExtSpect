Ext.define( 'uxExtSpect.store.object.property.GroupedPropertiesListStore',
	{     extend : 'uxExtSpect.store.object.property.PropertiesListStore',
		config : { groupField : "group", sorters : ["id" , "group"] }
	}
);
