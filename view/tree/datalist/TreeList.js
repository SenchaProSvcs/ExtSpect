Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' ,
			'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			indexBar: false
		},

		collectRowObjects: function () {
			this.rowObjects = this.collectComponentRowObjects();
			return this.rowObjects;
		},

		addComponentRowObject: function ( component ) {
			var newRowObject = this.createComponentRowObject( component );
			this.componentRowObjects.push( newRowObject );
		},

		// TODO : Ext.ComponentManger.map has all the components
		// Normally the root object is the Ext.Viewport
		collectComponentRowObjects: function () {
			var rootObject = this.fetchRootObject();
			this.componentRowObjects = [];
			if ( rootObject ) {
				this.depth = 1;
				this.totalCounts = [];
				this.counts = [];
				this.addComponentRowObjects2( rootObject );
			}
			return this.componentRowObjects;
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		addComponentRowObjects3: function ( component ) {
			if ( component.isContainer ) {
				var collection = component.items;
				var totalCount = collection.getCount();
				if ( totalCount > 0 ) {
					this.depth++;
					this.totalCounts.push( totalCount );
					this.counts.push( 0 );
					collection.each( this.addComponentRowObjects2, this );
					this.counts.pop();
					this.totalCounts.pop();
					this.depth--;
				}
			}
		},

		createComponentRowObject: function ( component ) {
			return { text: this.computeRowObjectString( component ), value: component };
		},

		// see also collectComponentRowObjects
		buildFinalRowObjects: function ( rec ) {
			console.log( arguments.callee.displayName, rec );
			this.depth = 1;
			this.totalCounts = [];
			this.counts = [];
			this.buildFinalRowObject2( rec );
		},

		// see also addComponentRowObjects3
		addNewRowObjects: function ( rowObjects ) {
			var totalCount = rowObjects.length;
			if ( totalCount > 0 ) {
				this.depth++;
				this.totalCounts.push( totalCount );
				this.counts.push( 0 );
				rowObjects.forEach( this.buildFinalRowObject2, this );
				this.counts.pop();
				this.totalCounts.pop();
				this.depth--;
			}
		},

		buildFinalRowObject2: function ( baseRowObject ) {
			this.rowObjects.push( this.createRowObject( baseRowObject ) );
			var array = baseRowObject.children || [];
			this.addNewRowObjects( array );
		},

		createRowObject: function ( baseRowObject ) {
			if ( !baseRowObject ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no baseRowObject', baseRowObject );
				debugger;
			}
			var object = baseRowObject.object;
			return { text: this.computeRowObjectString( object ), value: object };
		},

		computeRowObjectString: function ( object ) {
			var depth = this.depth;
			var counts = this.counts;
			var objectString = uxExtSpect.util.StringOf.to$( object );
			if ( this.fetchIsClosed( object ) ) {
				objectString += ' ++';
			}
			counts[ counts.length - 1 ]++;
			return this.fetchParentNavigationView().showListing ?
				objectString :
				(   uxExtSpect.instance.getUseTreeWithLines() ?
					this.computeVerticalBars().join( '' ) + this.computeObjectString( object, objectString ) :
					Ext.String.repeat( uxExtSpect.instance.getTreeIndentingChar(), depth ) + objectString
					);
		},

		computeObjectString: function ( object, objectString ) {
			return '<span style="font-weight:bold">' + objectString + '</span>';
		},

		verticalBarChar: String.fromCharCode( 0x2503 ), // 0x2503 0x2502
		verticalRightChar: String.fromCharCode( 0x2523 ), // 0x2523 0x251C 0x2520
		upAndRightChar: String.fromCharCode( 0x2517 ), // 0x2517 0x2514 0x2516
		// leftAndDownChar : String.fromCharCode( 0x2513 ) , // 0x2513 0x2511 0x2512
		// hotizontalAndDownChar : String.fromCharCode( 0x2533 ) , // 0x2533

		// return an array of chars representing on the left the tree and its branches
		computeVerticalBars: function () {
			var chars = [];
			var totalCounts = this.totalCounts;
			var totalCountsLen = totalCounts.length;
			var counts = this.counts;

			for ( var index = 0 , len = totalCountsLen - 1; index < len; index++ ) {
				if ( counts[ index ] < totalCounts[ index ] ) { chars.push( this.verticalBarChar ); } // ┃
				else { chars.push( '&emsp;' ); }
			}

			if ( totalCountsLen > 0 ) {
				if ( counts[ index ] === totalCounts[ index ] ) { chars.push( this.upAndRightChar ); } // ┗
				else {
					chars.push( this.verticalRightChar ); // ┣
				}

				chars.push( '&nbsp;' );
			}
			return chars;
		},

		// show the indexBar on the right only if this is a listing and not a tree
		determineAndSetIndexBar: function () {
			var isListing = this.fetchParentNavigationView().showListing;
			this.setIndexBar( isListing );
		},

		handleSingleItemTap: function ( dataview, index, listItem, record, mouseEvent, obj, eOptsObject ) {
			// console.log( arguments.callee.displayName, arguments );
			// console.log( arguments.callee.displayName, "record=", record );
			var value = record.data.value;
			// console.log( arguments.callee.displayName, "value.id||$className=", value.id || value.$className )

			if ( value && value.isPropertyPointerWithValue ) { value = value.fetchValue(); }

			if ( this.isInstance( value ) ) {
				var objectNavigationView = this.fetchObjectNavigationView();
				objectNavigationView.pushNewPropertiesPanel( value );
			}
			else {
				console.warn( Ext.displayName( arguments.callee ) +
					' selected item not an instance :', value );
			}
		},

		fetchIdString: function ( object ) { return this.id; },

		fetchIsClosedObject: function ( object, idString ) {
			var isClosedObject = object.hasOwnProperty( 'extSpectisClosedObject' ) &&
				object.extSpectisClosedObject;
			// console.log( arguments.callee.displayName, idString, "isClosedObject=", isClosedObject );
			if ( !isClosedObject ) {
				isClosedObject = new Object();
				isClosedObject[ idString ] = false;
				// isClosedObject[ ( object.$className || object.id) + "fICO" ] = Math.random();
				object.extSpectisClosedObject = isClosedObject;
				// console.log( arguments.callee.displayName, object.$className || object.id, "==", isClosedObject );
				// debugger;
			}
			return isClosedObject
		},

//		extspectItemsClosedObject: {},

//		fetchIdString: function ( object ) {
//			return ( object.hasOwnProperty( "$className" ) ) ? // object.superclass || object === Ext.Base
//				object.$className : object.id;
//		},

//		fetchIsClosedObject: function ( object, idString ) {
//			var isClosedObject = this.extspectItemsClosedObject;
////			console.log( arguments.callee.displayName, object.$className || object.id,
////				"isClosedObject=", isClosedObject );
//			isClosedObject[ idString ] = false;
//			// isClosedObject[ ( object.$className || object.id) + "fICO"] = Math.random();
//			// console.log( arguments.callee.displayName, object.$className || object.id, "==", isClosedObject );
//			//	debugger;
//			//	}
//			return isClosedObject
//		},

		fetchIsClosed: function ( object ) {
			var idString = this.fetchIdString( object );
			var isClosedObject = this.fetchIsClosedObject( object, idString );
			// console.log( arguments.callee.displayName, object.$className || object.id, isClosedObject );
			var isClosed = isClosedObject[ idString ];
			// console.log( arguments.callee.displayName, idString, isClosed );
			return isClosed;
		},

		assignIsClosed: function ( object, bool ) {
			var idString = this.fetchIdString( object );
			console.group( arguments.callee.displayName, idString, "bool=", bool );
			var isClosedObject = this.fetchIsClosedObject( object, idString );
			console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			isClosedObject[ idString ] = bool;
			// isClosedObject[ object.$className || object.id ] = Math.random();
			// console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			console.groupEnd( arguments.callee.displayName, "isClosedObject=", isClosedObject );
		},

		handleDoubleItemtap: function ( dataview, index, listItem, record, mouseEvent, obj, eOptsObject ) {
			// console.log( arguments.callee.displayName, arguments );
			var object = record.data.value
			console.group( arguments.callee.displayName, "object.$className||id=", object.$className || object.id )
			var isClosed = this.fetchIsClosed( object );
			console.log( arguments.callee.displayName, isClosed );
			this.assignIsClosed( object, !isClosed );
			this.computeAndSetData();
			this.handleSingleItemTap( dataview, index, listItem, record, mouseEvent, obj, eOptsObject );
			console.groupEnd( arguments.callee.displayName, "isClosed=", isClosed );
		}
	}
)
;
