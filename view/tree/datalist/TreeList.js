Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' ,
			'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			scrollToTopOnRefresh: false,
			listeners: {
				itemdoubletap: function () { this.handleItemDoubleTap.apply( this, arguments ); },
				itemtaphold: function () { this.handleItemTapHold.apply( this, arguments ); },
			}
		},

//		spanStringOf: function ( object, objectString ) {
//			return '<span style="font-weight:bold">' + objectString + '</span>';
//		},
		spanStringOf: function ( object, objectString ) {
			if ( this.isContainerOrClass( object ) ) {
				return '<span style="font-weight:bold">' + objectString + '</span>';}
			// else
			return objectString;
		},

		selectValue: function ( value ) {
			var store = this.getStore();
			if ( store ) { // a list that is not visible mght not have a store
				var objectString = this.valueStringOf( value );
				var record = store.findRecord( "text", objectString, 0, true );
				if ( record ) {
					this.deselectAll();
					this.select( record, false );
				}
			}
		},

		addRowObjects: function ( object ) {
			this.depth = 1; // used when getUseTreeWithLines is false
			this.totalCounts = [];
			this.counts = [];
			this.addRowObjectsForObjectAndChildren( object );
		},


		addChildRowObjects: function ( object ) {
			var array = this.objectChildren( object );
			var totalCount = array.length;
			if ( totalCount > 0 ) {
				this.depth ++ // used when showListing
				this.totalCounts.push( totalCount );
				this.counts.push( 0 );
				array.forEach( this.addRowObjectsForObjectAndChildren, this );
				this.counts.pop();
				this.totalCounts.pop();
				this.depth --;
			}
		},

		addRowObject: function ( object ) {
			this.rowObjects.push( this.createRowObject( object ) );
		},

//		addRowObjectsForObjectAndChildren: function ( object ) {
//			this.addRowObject( object );
//			this.addChildRowObjects( object );
//		},

		addRowObjectsForObjectAndChildren: function ( object ) {
			this.addRowObject( object );
			if ( this.isContainerOrClass( object ) && ! this.isClosed( object ) ) {
				this.addChildRowObjects( object );
			}
		},

		setBranchStateNoneIfParentStateIsKids: function ( object ) {
			//console.log( arguments.callee.displayName, 'o=' + object.id );

			var parent = this.parentOf( object );
			//	if ( parent ) {console.log( arguments.callee.displayName, 'p=' + parent.id );}

			if ( parent && this.isShowingChildren( parent ) ) {
				//	console.log( arguments.callee.displayName, 'isSC=' + this.isShowingChildren( parent ) );
				this.setBranchState( object, 'none' );
			}
		},

		/*
		 Counts and totalCounts are arrays that keep track of the number of rows are in a group at a given level.
		 Each element in the array contains the count for group of items at that level of indentation.
		 TotalCount represents the total number of rows in the group.
		 Count is an index to the current row withing the group.
		 addChildRowObjects pushes these counts onto the arrays.
		 ext.viewport
		 ┣ ext-container-1       count = 0, totalCount = 2
		 ┃┣ ext-component-11    count = 0, totalCount = 3
		 ┃┣ ext-component-12    count = 1, totalCount = 3
		 ┃┗ ext-component-12    count = 2, totalCount = 3
		 ┗ ext-component-1     count = 1, totalCount = 2
		 */
		rowStringOf: function ( object ) {

			// increment the row count within the group
			var counts = this.counts;
			counts[ counts.length - 1 ] ++;

			this.setBranchStateNoneIfParentStateIsKids( object );

			var objectString = this.valueStringOf( object );
			if ( this.isClosed( object ) ) {
				objectString += ' ++';
			}
			if ( this.isShowingChildren( object ) ) {
				objectString += ' &&';
			}

			var spanString = this.spanStringOf( object, objectString );

			switch ( this.fetchParentNavigationView().presentationMode ) {
				case 'tree' :
					return this.computeVerticalBars( object, objectString ).join( '' ) + spanString;
				case  'indented' :
					return Ext.String.repeat( this.treeIndentingChar, this.depth ) + spanString;
				case  'list' :
					return objectString;
			}
		},

		treeIndentingChar: '&ensp;',  // &emsp; &ensp; &nbsp;
		verticalBarChar: String.fromCharCode( 0x2503 ), // 0x2503 0x2502
		verticalRightChar: String.fromCharCode( 0x2523 ), // 0x2523 0x251C 0x2520
		upAndRightChar: String.fromCharCode( 0x2517 ), // 0x2517 0x2514 0x2516
		// leftAndDownChar : String.fromCharCode( 0x2513 ) , // 0x2513 0x2511 0x2512
		// hotizontalAndDownChar : String.fromCharCode( 0x2533 ) , // 0x2533

		// for each row, return an array of chars representing on the left the tree and its branches
		computeVerticalBars: function ( object, objectString ) {
			var chars = [];
			var totalCounts = this.totalCounts;
			var totalCountsLen = totalCounts.length;
			var counts = this.counts;
			var index = 0;

			// add on the vertical bars
			for ( var len = totalCountsLen - 1; index < len; index ++ ) {
				if ( counts[ index ] < totalCounts[ index ] ) { chars.push( this.verticalBarChar ); } // ┃
				else { chars.push( '&emsp;' ); }
			}

			// console.log( objectString, counts[ index ], totalCounts[ index ] );//, counts, totalCounts );

			// index === ( totalCountsLen - 1 ), the last item in the array
			if ( totalCountsLen > 0 ) {
				if ( counts[ index ] === totalCounts[ index ] ) // last row in the group
				{ chars.push( this.upAndRightChar ); } // ┗
				else { chars.push( this.verticalRightChar ); } // ┣

				chars.push( '&nbsp;' );
			}

			return chars;
		},

//		setRowString: function ( rowObject ) {
//			var value = rowObject.value;
//			rowObject.text = this.rowStringOf( value );
//		},

		determineAndSetIndexBar: function () {
			this.setIndexBar( false );
		},

		handleItemSingleTap: function ( dataview, index, listItem, record ) {
			// console.log( arguments.callee.displayName, "record=", record );
			var value = record.data.value;

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

		idStringFor: function ( object ) { return this.id; },

		branchStateObjectFor: function ( object, listIdString ) {
			var stateObject = object.hasOwnProperty( 'extspectBranchStateObject' ) &&
				object.extspectBranchStateObject;
			if ( ! stateObject ) {
				stateObject = new Object();
				stateObject[ listIdString ] = 'all';
				object.extspectBranchStateObject = stateObject;
			}
			return stateObject
		},

		// branchState represents how many levels of descendents will be shown from this node
		// possible values are: 'all' | 'none' | 'kids'. Kids means 1 level.
		branchStateOf: function ( object ) {
			var listIdString = this.idStringFor( object );
			var stateObject = this.branchStateObjectFor( object, listIdString );
			return stateObject[ listIdString ];
		},

		isClosed: function ( object ) {
			return this.branchStateOf( object ) === 'none'
		},

		isShowingChildren: function ( object ) {
			return this.branchStateOf( object ) === 'kids'
		},

		setBranchState: function ( object, string ) {
			var listIdString = this.idStringFor( object );
			var stateObject = this.branchStateObjectFor( object, listIdString );
			stateObject[ listIdString ] = string;
		},

		handleItemDoubleTap: function ( dataview, index, listItem, record ) {
			var object = record.data.value
			var isClosed = this.isClosed( object );

			// console.log( arguments.callee.displayName, isClosed );
			this.setBranchState( object, isClosed ? 'kids' : 'none' );

			var parent = this.parentOf( object );
			if ( this.isShowingChildren( parent ) ) {
				this.setBranchState( parent, 'all' );
			}

			// console.log( arguments.callee.displayName, this.branchStateOf( object ) );
			this.computeAndSetData();
			this.selectValue( object );
		},

		handleItemTapHold: function ( dataview, index, listItem, record ) {
			var object = record.data.value
			var branchState = this.branchStateOf( object );
			// console.log( arguments.callee.displayName, '1 ' + this.branchStateOf( object ) );
			if ( branchState === 'all' ) {
				this.setBranchState( object, 'none' );
			}
			else {
				this.setBranchState( object, 'all' );
				this.setItemsBranchStateToNone( object );
			}
			// console.log( arguments.callee.displayName, '2 ' + this.branchStateOf( object ) );
			this.computeAndSetData();
			// this.selectValue( object );
		},

		setItemsBranchStateToNone: function ( object ) {
			if ( this.isContainerOrClass( object ) ) {
				this.setBranchState( object, 'all' );
				this.objectChildren( object ).forEach( this.setItemsBranchStateToNone, this );
			}
		}
	}
);
