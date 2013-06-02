Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' ,
			'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			scrollToTopOnRefresh: false,
//			listeners: {
//				itemdoubletap: function () { this.handleItemDoubleTap.apply( this, arguments ); },
//				itemtaphold: function () { this.handleItemTapHold.apply( this, arguments ); }
//			}
		},

//		spanStringOf: function ( object, objectString ) {
//			return '<span style="font-weight:bold">' + objectString + '</span>';
//		},
		spanStringOf: function ( object, objectString ) {
			if ( this.isContainerOrClass( object ) ) {
				return '<span style="font-weight:bold">' + objectString + '</span>';
			}
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
			var array = this.showableChildren( object );
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

			var objectString = this.valueStringOf( object );
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

		idStringFor: function ( object ) { return this.id; }
	}
);
