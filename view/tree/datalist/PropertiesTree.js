/* The PropertiesTree is used for the App and Ext view,
where most of the nodes are showing properties of the
parent object.
 */

Ext.define( 'uxExtSpect.view.tree.datalist.PropertiesTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',

		isContainerOrClass: function ( rec ) {
			return true; // rec.children;
		},

		parentOf: function ( rec ) {
			return undefined;
		},

		showableChildren: function ( rec ) {
			return rec.children || [];
		},

		collectRowObjects: function () {
			var object = this.fetchRootObject();
			if ( ! object ) { return null; }

			this.baseRecs = [];
			this.branchObjects = [];
			this.depth = 0;
			var startRec = this.createRecTree( object, {}, [] );

			this.rowObjects = [];

			if ( this.baseRecs.length > 0 ) {
				this.addRowObjects( startRec );
			}

			return this.rowObjects;
		},

		addRowObjectsForObjectAndChildren: function ( rec ) {
			this.addRowObject( rec );
			this.addChildRowObjects( rec );
		},

		createRowObject: function ( rec ) {
			if ( ! rec ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no baseRowObject', rec );
				debugger;
			}
			var value = rec.object;
			return { text: this.rowStringOf( value ), value: value };
		},

		createRecTree: function ( object, parentRec, parentRecChildRecs ) {

			if ( this.depth > 19 ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': Exceeded depth = ' + this.depth );
				debugger;
			}

			var rec;
			// block repetition of an object in a branch
			var nextObject = object;
			if ( object.isPropertyPointerWithInstance ) { nextObject = object.fetchValue(); }
			if ( this.branchObjects.indexOf( nextObject ) !== - 1 ) {
				console.groupEnd( "STOP BRANCH " + this.valueStringOf( nextObject ) );
			}
			else {
				rec = this.createRec( object );
				this.depth ++;
				this.branchObjects.push( object );

				if ( this.isInstance( object ) ) {
					var skipDirectChild = parentRec.isPropertyPointerRec &&
						( ! parentRec.object.isPropertyPointerWithArray );
					var childRecs = this.createChildRecs( object, rec );
					if ( skipDirectChild ) {
						var recIndex = parentRecChildRecs.indexOf( rec );
						if ( recIndex !== - 1 ) {
							console.error( 'createRecTree : rec found in parentRec.childRecs, rec =' +
								StringOf.to$( rec ), rec );
							debugger;
						}
						for ( var index = 0 , len = childRecs.length; index < len; index ++ ) {
							parentRecChildRecs.push( childRecs[ index ] );
						}
					}
					else {
						rec.children = childRecs;
						parentRecChildRecs.push( rec );
					}
				}

				this.depth --;
				this.branchObjects.pop();
			}
			return rec; // rec expected by collectRowObjects()
		},

		createChildRecs: function ( parentObject, parentRec ) {
			var properties = parentRec.fetchProperties();
			var childRecs = [];
			for ( var index = 0 , len = properties.length; index < len; index ++ ) {
				var property = properties[ index ];
				if ( ! ( property in parentObject ) ) {
					console.warn( '>>>> createChildRecs' +
						': "' + property + '" not in parentObject', parentObject );
				}
				else {
					var value = parentObject[ property ];

					if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.Collection ) ) {
						value = this.extCollectionToArray( value );
					}
					else {
						if ( ( value instanceof NodeList ) || ( value instanceof HTMLCollection ) ) {
							value = this.htmlCollectionToArray( value );
						}
					}

					if ( value instanceof Array ) {
						this.createArrayRecs( parentObject, property, value, parentRec, childRecs );
					}
					else {
						if ( this.isInstance( value ) ) {
							this.createChildRec( parentObject, property, value, parentRec, childRecs );
						}
					}
				}
			}
			return childRecs;
		},

		createArrayRecs: function ( parentObject, property, array, parentRec, childRecs ) {
			if ( parentObject.isPropertyPointerWithArray ) {
				for ( var index2 = 0 , len2 = array.length; index2 < len2; index2 ++ ) {
					this.createChildRec( array, index2, array[ index2 ], parentRec, childRecs );
				}
			}
			else {
				if ( ( array.length > 0 ) && this.isInstance( array[0] ) ) {
					var pointer = this.createPropertyPointer( parentObject, property, array, 'uxExtSpect.object.pointer.PropertyPointerWithArray' );
					if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
				}
			}
		},

		createChildRec: function ( parentObject, property, value, parentRec, childRecs ) {
			if ( parentObject.isPropertyPointerWithInstance ) {
				this.createRecTree( value, parentRec, childRecs );
			}
			else {
				var pointer = this.createPropertyPointer( parentObject, property, value,
					'uxExtSpect.object.pointer.PropertyPointerWithInstance' );
				if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
			}
		},

		createPropertyPointer: function ( parentObject, property, value, pointerClassName ) {
			var pointer;

			var propertyCount = uxExtSpect.util.StringOf.propertyCount( value );
			if ( propertyCount > 0 ) {
				pointer = Ext.create( pointerClassName, {} );
				pointer.object = parentObject;
				pointer.property = property;
				pointer.value = value;
			}
			return pointer;
		},

		createRec: function ( object ) {
			if ( ! object ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no object', object );
				debugger;
			}
			var recClassName = this.determineRecClassName( object );
			var rec = Ext.create( recClassName, {} );
			rec.object = object;
			rec.listenersOk = this.listenersOk;
			rec.esClassName = recClassName; // not used, just for debugging
			this.baseRecs.push( rec );
			return rec;
		},

		requires: [
			'uxExtSpect.object.rec.ApplicationRec' ,
			'uxExtSpect.object.rec.ComponentRec' ,
			'uxExtSpect.object.rec.ControllerRec' ,
			'uxExtSpect.object.rec.DispatcherRec' ,
			'uxExtSpect.object.rec.ExtElementRec' ,
			'uxExtSpect.object.rec.HtmlDocumentRec' ,
			'uxExtSpect.object.rec.HtmlElementRec' ,
			'uxExtSpect.object.rec.ModelRec' ,
			'uxExtSpect.object.rec.PropertyPointerRec' ,
			'uxExtSpect.object.pointer.PropertyPointerWithInstance' ,
			'uxExtSpect.object.pointer.PropertyPointerWithArray' ,
			'uxExtSpect.object.rec.ProxyRec' ,
			'uxExtSpect.object.rec.RouteRec' ,
			'uxExtSpect.object.rec.RouterRec'  ,
			'uxExtSpect.object.rec.SimpleObjectRec' ,
			'uxExtSpect.object.rec.StoreRec'  ,
			'uxExtSpect.object.rec.StoreManagerRec'
		],

		determineRecClassName: function ( object ) {
			var recClassName;
			if ( object.isPropertyPointerWithValue ) {
				recClassName = 'uxExtSpect.object.rec.PropertyPointerRec';
			}
			else {
				if ( object.hasOwnProperty( "modelName" ) ) { recClassName = 'uxExtSpect.object.rec.ModelRec'; }
				else {
					if ( object instanceof Ext.app.Application ) { recClassName = 'uxExtSpect.object.rec.ApplicationRec'; }
					else {
						if ( object instanceof Ext.app.Controller ) { recClassName = 'uxExtSpect.object.rec.ControllerRec'; }
						else {
							if ( object instanceof Ext.lib.Component ) { recClassName = 'uxExtSpect.object.rec.ComponentRec'; }
							else {
								if ( object instanceof Ext.event.Dispatcher ) { recClassName = 'uxExtSpect.object.rec.DispatcherRec'; }
								else {
									if ( object instanceof Ext.dom.Element ) { recClassName = 'uxExtSpect.object.rec.ExtElementRec'; }
									else {
										if ( object instanceof HTMLElement ) { recClassName = 'uxExtSpect.object.rec.HtmlElementRec'; }
										else {
											if ( object instanceof HTMLDocument ) { recClassName = 'uxExtSpect.object.rec.HtmlDocumentRec'; }
											else {
												if ( object instanceof Ext.data.proxy.Proxy ) { recClassName = 'uxExtSpect.object.rec.ProxyRec'; }
												else {
													if ( object instanceof Ext.app.Route ) { recClassName = 'uxExtSpect.object.rec.RouteRec'; }
													else {
														if ( object instanceof Ext.app.Router ) { recClassName = 'uxExtSpect.object.rec.RouterRec'; }
														else {
															if ( object.isStore || ( object instanceof Ext.data.Store ) ) {
																recClassName = 'uxExtSpect.object.rec.StoreRec';
															}
															else {
																if ( object instanceof Object ) {
																	recClassName = 'uxExtSpect.object.rec.SimpleObjectRec';
																}
																else { recClassName = 'uxExtSpect.object.rec.BaseRec'; }
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			return recClassName;
		}
	} );
