Ext.define( 'uxExtSpect.view.object.datalist.ArrayList',
	{  extend: 'uxExtSpect.view.object.datalist.PropertiesOrArrayList',
		xtype: 'arraylist',
		requires: 'uxExtSpect.store.object.ArrayListStore',
		storeName: 'uxExtSpect.store.object.ArrayListStore',

		isGroupedOk: function () { return false; },

		collectRowObjects: function () {
			var rootObject = this.fetchRootObject();
			var value = rootObject.fetchValue();
			var array = value;

			if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.HashMap ) ) {
				array = this.extCollectionToArray( array );
			}
			else {
				if ( value instanceof Ext.util.Collection ) {
					array = ( this.parent.title === 'All' ) ? value.all : value.items;
				}
			}

			if ( array === undefined ) {
				console.error( 'ArrayList#collectRowObjects array is undefined, dataObject = ', rootObject );
			}

			var rowObjects = array.map( this.createRowObject, this );
			return rowObjects;
		}
	}
);

