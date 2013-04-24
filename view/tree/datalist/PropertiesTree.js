Ext.define( 'ux.extspect.view.tree.datalist.PropertiesTree',
	{  extend : 'ux.extspect.view.tree.datalist.TreeList',

		collectRowObjects : function () {
			var object = this.fetchRootObject();
			if ( !object ) { return null; }

			this.baseRecs = [];
			this.branchObjects = [];
			this.depth = 0;
			var startRec = this.createRecTree( object, {}, [] );

			this.rowObjects = [];

			if ( this.baseRecs.length > 0 ) { this.buildFinalRowObjects( startRec ); }

			return this.rowObjects;
		},

		createRecTree : function ( object, parentRec, parentRecChildRecs ) {
			if ( this.depth > 19 ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': Exceeded depth = ' + this.depth );
				debugger;
			}
			var rec;
			// block repetition of an object in a branch
			var nextObject = object;
			if ( object.isPropertyPointerWithInstance ) { nextObject = object.fetchValue(); }
			if ( this.branchObjects.indexOf( nextObject ) !== -1 ) {
				console.groupEnd( "STOP BRANCH " + ux.extspect.util.StringOf.to$( nextObject ) );
			}
			else {
				rec = this.createRec( object );
				this.depth++;
				this.branchObjects.push( object );

				if ( this.isInstance( object ) ) {
					var skipDirectChild = parentRec.isPropertyPointerRec &&
						( !parentRec.object.isPropertyPointerWithArray );
					var childRecs = this.createChildRecs( object, rec );
					if ( skipDirectChild ) {
						var recIndex = parentRecChildRecs.indexOf( rec );
						if ( recIndex !== -1 ) {
							console.error( 'createRecTree : rec found in parentRec.childRecs, rec =' +
								StringOf.to$( rec ), rec );
							debugger;
						}
						for ( var index = 0 , len = childRecs.length; index < len; index++ ) { parentRecChildRecs.push( childRecs[ index ] ); }
					}
					else {
						rec.children = childRecs;
						parentRecChildRecs.push( rec );
					}
				}

				this.depth--;
				this.branchObjects.pop();
			}
			return rec; // rec expected by collectRowObjects()
		},

		createChildRecs : function ( parentObject, parentRec ) {
			var properties = parentRec.fetchProperties();
			var childRecs = [];
			for ( var index = 0 , len = properties.length; index < len; index++ ) {
				var property = properties[ index ];
				if ( !( property in parentObject ) ) {
					console.warn( '>>>> createChildRecs' +
						': "' + property + '" not in parentObject', parentObject );
				}
				else {
					var value = parentObject[ property ];

					if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.Collection ) ) { value = this.extCollectionToArray( value ); }
					else {
						if ( ( value instanceof NodeList ) || ( value instanceof HTMLCollection ) ) { value = this.htmlCollectionToArray( value ); }
					}

					if ( value instanceof Array ) { this.createArrayRecs( parentObject, property, value, parentRec, childRecs ); }
					else {
						if ( this.isInstance( value ) ) {
							this.createChildRec( parentObject, property, value, parentRec, childRecs );
						}
					}
				}
			}
			return childRecs;
		},

		createArrayRecs : function ( parentObject, property, array, parentRec, childRecs ) {
			if ( parentObject.isPropertyPointerWithArray ) {
				for ( var index2 = 0 , len2 = array.length; index2 < len2; index2++ ) { this.createChildRec( array, index2, array[ index2 ], parentRec, childRecs ); }
			}
			else {
				if ( ( array.length > 0 ) && this.isInstance( array[0] ) ) {
					var pointer = this.createPropertyPointer( parentObject, property, array, 'ux.extspect.object.pointer.PropertyPointerWithArray' );
					if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
				}
			}
		},

		createChildRec : function ( parentObject, property, value, parentRec, childRecs ) {
			if ( ( property !== 'superclass' ) && ( property !== 'mixins' ) ) { }// do we need these ? (Check Ext tree)
			if ( parentObject.isPropertyPointerWithInstance ) {
				this.createRecTree( value, parentRec, childRecs );
			}
			else {
				var pointer = this.createPropertyPointer( parentObject, property, value,
					'ux.extspect.object.pointer.PropertyPointerWithInstance' );
				if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
			}
		},

		createPropertyPointer : function ( parentObject, property, value, pointerClassName ) {
			var pointer;

			var propertyCount = ux.extspect.util.StringOf.propertyCount( value );
			if ( propertyCount > 0 ) {
				pointer = Ext.create( pointerClassName, {} );
				pointer.object = parentObject;
				pointer.property = property;
				pointer.value = value;
			}
			return pointer;
		},

		createRec : function ( object ) {
			if ( !object ) {
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

		requires : [
			'ux.extspect.object.rec.ApplicationRec' ,
			'ux.extspect.object.rec.ComponentRec' ,
			'ux.extspect.object.rec.ControllerRec' ,
			'ux.extspect.object.rec.DispatcherRec' ,
			'ux.extspect.object.rec.ExtElementRec' ,
			'ux.extspect.object.rec.HtmlDocumentRec' ,
			'ux.extspect.object.rec.HtmlElementRec' ,
			'ux.extspect.object.rec.ModelRec' ,
			'ux.extspect.object.rec.PropertyPointerRec' ,
			'ux.extspect.object.pointer.PropertyPointerWithInstance' ,
			'ux.extspect.object.pointer.PropertyPointerWithArray' ,
			'ux.extspect.object.rec.ProxyRec' ,
			'ux.extspect.object.rec.RouteRec' ,
			'ux.extspect.object.rec.RouterRec'  ,
			'ux.extspect.object.rec.SimpleObjectRec' ,
			'ux.extspect.object.rec.StoreRec'  ,
			'ux.extspect.object.rec.StoreManagerRec'
		],

		determineRecClassName : function ( object ) {
			var recClassName;
			if ( object.isPropertyPointerWithValue ) { recClassName = 'ux.extspect.object.rec.PropertyPointerRec'; }
			else {
				if ( object.hasOwnProperty( "modelName" ) ) // $className
				{ recClassName = 'ux.extspect.object.rec.ModelRec'; }
				else {
					if ( object instanceof Ext.app.Application ) { recClassName = 'ux.extspect.object.rec.ApplicationRec'; }
					else {
						if ( object instanceof Ext.app.Controller ) { recClassName = 'ux.extspect.object.rec.ControllerRec'; }
						else {
							if ( object instanceof Ext.lib.Component ) { recClassName = 'ux.extspect.object.rec.ComponentRec'; }
							else {
								if ( object instanceof Ext.event.Dispatcher ) { recClassName = 'ux.extspect.object.rec.DispatcherRec'; }
								else {
									if ( object instanceof Ext.dom.Element ) { recClassName = 'ux.extspect.object.rec.ExtElementRec'; }
									else {
										if ( object instanceof HTMLElement ) { recClassName = 'ux.extspect.object.rec.HtmlElementRec'; }
										else {
											if ( object instanceof HTMLDocument ) { recClassName = 'ux.extspect.object.rec.HtmlDocumentRec'; }
											else {
												if ( object instanceof Ext.data.proxy.Proxy ) { recClassName = 'ux.extspect.object.rec.ProxyRec'; }
												else {
													if ( object instanceof Ext.app.Route ) { recClassName = 'ux.extspect.object.rec.RouteRec'; }
													else {
														if ( object instanceof Ext.app.Router ) { recClassName = 'ux.extspect.object.rec.RouterRec'; }
														else {
															if ( object.isStore || ( object instanceof Ext.data.Store ) ) { recClassName = 'ux.extspect.object.rec.StoreRec'; }
															else {
																if ( object === Ext ) { recClassName = 'ux.extspect.object.rec.ExtRec'; }
																else {
																	if ( object instanceof Object ) { recClassName = 'ux.extspect.object.rec.SimpleObjectRec'; }
																	else { recClassName = 'ux.extspect.object.rec.BaseRec'; }
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
			}
			return recClassName;
		}
	} );
