//TODO: usefull info about a store is the number of records, page size, and
//scrolling page(? which page you are on )

Ext.define( 'ux.extspect.object.rec.StoreRec',
	{  extend : 'ux.extspect.object.rec.BaseRec',

		properties : [
			"_model" , "_proxy" // ?? "getRange"
		],
		listenerProperties : ["eventDispatcher" , "_listeners" , "managedListeners"],
		dataProperties : ["_grouper" , "_sorters"], // "getFields" , "getGroups" ,

		fetchProperties : function () {
			var properties = this.callParent( arguments );

			if ( this.dataPropertiesOk )
			{ properties = properties.concat( this.dataProperties );}
			return properties;
		}
	}
);
