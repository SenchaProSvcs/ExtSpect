Ext.define( 'ux.extspect.view.object.datalist.property.MethodsList',
	{  extend : 'ux.extspect.view.object.datalist.property.PropertiesList',
		xtype : 'methodlist',

		storeName : 'ux.extspect.store.object.property.PropertiesListStore',
		determineGroupedOk : function () { return false; }, // we do not group methods yet

		isValueOk : function ( value, property ) { return ( value instanceof Function ); }
	}
);

/* TODO: SHOULD BE ABLE TO INSPECT THE CODE OF METHODS
 AND EVENTUALLY EDIT THEM (BRING CODE UP IN AN EDITOR)
 SHOULD ALSO BE ABLE TO SORT BY PROPERTY NAME OR BY FUNCTION NAME
 */
