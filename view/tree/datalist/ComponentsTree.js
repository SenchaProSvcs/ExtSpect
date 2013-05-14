Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		computeObjectString: function ( object, objectString ) {
			if ( "items" in object ) {
				return this.callParent( arguments );
			}
			else {
				return objectString; //  uxExtSpect.util.StringOf.to$( object );
			}
		},
		fetchIsClosedObject: function ( object ) {
			var isClosedObject = object.extSpectisClosedObject;
//			console.log( arguments.callee.displayName, object.$className || object.id,
//				"isClosedObject=", isClosedObject );
			if ( !isClosedObject ) {
				isClosedObject = new Object();
				var listId = this.id;
				isClosedObject[ listId ] = false;
				// isClosedObject[ ( object.$className || object.id) + "fICO" ] = Math.random();
				object.extSpectisClosedObject = isClosedObject;
				// console.log( arguments.callee.displayName, object.$className || object.id, "==", isClosedObject );
				// debugger;
			}
			return isClosedObject
		},

		fetchIsClosed: function ( object ) {
			var isClosedObject = this.fetchIsClosedObject( object );
			// console.log( arguments.callee.displayName, object.$className || object.id, isClosedObject );
			var listId = this.id;
			var isClosed = isClosedObject[ listId ];
			// console.log( arguments.callee.displayName, object.$className || object.id, isClosed );
			return isClosed;
		},

		assignIsClosed: function ( object, bool ) {
			console.group( arguments.callee.displayName, object.$className || object.id, "bool=", bool );
			if ( object.isContainer ) {
			var isClosedObject = this.fetchIsClosedObject( object );
			console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			isClosedObject[ this.id ] = bool;
			// isClosedObject[ object.$className || object.id ] = Math.random();
			}
			console.groupEnd( arguments.callee.displayName, "isClosedObject=", isClosedObject );
		}
	}
);
