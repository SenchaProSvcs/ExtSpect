Ext.define( 'extspect.view.object.datalist.ArrayList',
	{  extend : 'extspect.view.object.datalist.PropertiesOrArrayList',
		xtype : 'arraylist',
		requires : 'extspect.store.object.ArrayListStore',
		storeName : 'extspect.store.object.ArrayListStore',

		determineGroupedOk : function () { return false; },

		collectRowObjects : function () {
			var rootObject = this.fetchRootObject();
			var value = rootObject.fetchValue();
			var array = value;

			if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.HashMap ) )
			{ array = this.extCollectionToArray( array ); }
			else {
				if ( value instanceof Ext.util.Collection )
				{ array = ( this.parent.title === 'All' ) ? value.all : value.items; }
			}

			// Trace.vars( 'array' , array , 'dataObject.object' , dataObject.object , 'dataObject.id' , dataObject.id )
			if ( array === undefined )
			{ console.error( 'ArrayList#collectRowObjects array is undefined, dataObject = ', rootObject ); }

			var rowObjects = array.map( this.createRowObject );
			return rowObjects;
		}
	}
);

