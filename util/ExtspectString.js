// Adds an extspectString() method to various Ext classes so that ExtSpect display them abbreviated fashion

Ext.define( 'uxExtSpect.util.ExtspectString', { } );

if ( !uxExtSpect.util.StringOf ) { uxExtSpect.util.StringOf = {} }

Ext.extspectString = function () { return uxExtSpect.util.StringOf.embrace$( '', 'Ext' ); };
Ext.extspectString._name = 'Ext#extspectString';

// moved to uxExtSpect.util.StringOf.js
// uxExtSpect.util.StringOf.class$ = function ( value ) {
//	return value.hasOwnProperty( "superclass" ) ? uxExtSpect.util.StringOf.object$( value, '' ) : null;
//};
//uxExtSpect.util.StringOf.class$._name = 'uxExtSpect.util.StringOf.class$';

Ext.app.Application.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "App", uxExtSpect.util.StringOf.quote$( this.name ) ); };
Ext.app.Application.prototype.extspectString._name = 'Ext.app.Application#extspectString';
// uxExtSpect.util.StringOf.object$( ExtSpectSolo.app )

Ext.Loader.require( 'Ext.util.Collection',
	function () {
		Ext.util.Collection.prototype.extspectString =
			function () {
				return uxExtSpect.util.StringOf.class$( this ) ||
					uxExtSpect.util.StringOf.embrace$( "Clctn", uxExtSpect.util.StringOf.to$( this.items ) +
						( ( this.all.length > 0 ) ? ( ' ' + this.items.length + '/' + this.all.length ) : '' ) );
			};
		Ext.util.Collection.prototype.extspectString._name = 'Ext.util.Collection#extspectString';
	}
);

Ext.Loader.require( 'Ext.util.HashMap',
	function () {
		Ext.util.HashMap.prototype.extspectString =
			function () { return uxExtSpect.util.StringOf.embrace$( "HashMap", uxExtSpect.util.StringOf.to$( this.getValues() ) ); };
		Ext.util.HashMap.prototype.extspectString._name = 'Ext.util.HashMap#extspectString';
	}
);

Ext.util.MixedCollection.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "MxdClctn", uxExtSpect.util.StringOf.to$( this.items ) ); };
Ext.util.MixedCollection.prototype.extspectString._name = 'Ext.util.MixedCollection#extspectString';

// This is a subclass of MixedCollection
Ext.ItemCollection.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "ItmClctn", uxExtSpect.util.StringOf.to$( this.items ) ); };
Ext.ItemCollection.prototype.extspectString._name = 'Ext.ItemCollection#extspectString';

Ext.app.Controller.prototype.extspectString =
	function () {
		return  uxExtSpect.util.StringOf.class$( this ) ||
			uxExtSpect.util.StringOf.embrace$( "Cntrlr", uxExtSpect.util.StringOf.quote$( uxExtSpect.util.StringOf.lastPartOfName( this.$className, 1 ) ) );
	};
Ext.app.Controller.prototype.extspectString._name = 'Ext.util.MixedCollection#extspectString';

/*Ext.Loader.require( 'Ext.data.Model' )
 Ext.data.Model.prototype.extspectString =
 function ( ) { return uxExtSpect.util.StringOf.embrace$( "Model" , uxExtSpect.util.StringOf.to$( "????"))}///this.getName() ) ) }
 Ext.data.Model.prototype.extspectString._name = 'Ext.data.Model#extspectString'*/

Ext.Loader.require( 'Ext.data.Store',
	function () {
		Ext.data.Store.prototype.extspectString =
			function () { return uxExtSpect.util.StringOf.embrace$( "Store", uxExtSpect.util.StringOf.quote$( this.getStoreId() ) ); };
		Ext.data.Store.prototype.extspectString._name = 'Ext.data.Store#extspectString';
	}
);

Ext.Loader.require( 'Ext.data.proxy.Proxy',
	function () {
		Ext.data.proxy.Proxy.prototype.extspectString =
			function () { return uxExtSpect.util.StringOf.embrace$( "Proxy", uxExtSpect.util.StringOf.quote$( this.id ) ); };
		Ext.data.proxy.Proxy.prototype.extspectString._name = 'Ext.data.proxy.Proxy#extspectString';
	}
);

// Ext.Loader.require( 'Ext.app.Route' )
Ext.app.Route.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "Route", this.getUrl() + ':' + this.getAction() ); };
Ext.app.Route.prototype.extspectString._name = 'Ext.app.Route#extspectString';

Ext.Loader.require( 'Ext.data.Field',
	function () {
		Ext.data.Field.prototype.extspectString =
			function () { return uxExtSpect.util.StringOf.embrace$( "Field", uxExtSpect.util.StringOf.quote$( this.getName() ) ); };
		Ext.data.Field.prototype.extspectString._name = 'Ext.data.Field#extspectString';
	}
);

Ext.dom.Element.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "ExtElmnt", uxExtSpect.util.StringOf.quote$( this.id ) ); };
Ext.dom.Element.prototype.extspectString._name = 'Ext.dom.Element#extspectString';

// ========== JAVASCRIPT OBJECTS

Array.prototype.extspectString = function () { return uxExtSpect.util.StringOf.array$( this ); }; // typeof( [] ) -> 'object'
Array.prototype.extspectString._name = 'Array#extspectString';

// typeof( new Boolean( false ) ) -> 'object'
Boolean.prototype.extspectString = function () { return uxExtSpect.util.StringOf.embrace$( 'Bln', this ); };
Boolean.prototype.extspectString._name = 'Boolean#extspectString';
// console.log( new Boolean( false ).to$() )

Date.prototype.extspectString = function () { return uxExtSpect.util.StringOf.date$( this ); };
Date.prototype.extspectString._name = 'Date#extspectString';

// typeof( uxExtSpect.util.StringOf.to$ ) -> 'function'
Function.prototype.extspectString = function () {
	if ( "modelName" in this ) { return uxExtSpect.util.StringOf.embrace$( 'Model', uxExtSpect.util.StringOf.quote$( uxExtSpect.util.StringOf.functionName( this ) ) ); }
	return uxExtSpect.util.StringOf.functionName( this ) + '()';
};
Function.prototype.extspectString._name = 'Function#extspectString';
// console.log( uxExtSpect.util.StringOf.to$.to$() )

// typeof( new Number( '234' ) ) -> 'object'
Number.prototype.extspectString = function () { return uxExtSpect.util.StringOf.embrace$( 'Number', this ); };
Number.prototype.extspectString._name = 'Number#extspectString';
// console.log( new Number( '234' ).to$() )

RegExp.prototype.extspectString = function () { return uxExtSpect.util.StringOf.ellipsis$( uxExtSpect.util.StringOf.embrace$( 'RegExp', this ) ); };
RegExp.prototype.extspectString._name = 'RegExp#extspectString';

// typeof( new String( 'ABC' ) ) -> 'object'
String.prototype.extspectString = function () { return uxExtSpect.util.StringOf.embrace$( 'String', uxExtSpect.util.StringOf.quote$( this ) ); };
String.prototype.extspectString._name = 'String#extspectString';
// console.log( new String( 'ABC' ).to$() )

// ========== HTML/DOM OBJECTS

DOMTokenList.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "DomTknList", uxExtSpect.util.StringOf.object$( this ) ); };
DOMTokenList.prototype.extspectString._name = 'DOMTokenList#extspectString';

HTMLCollection.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "HtmlClctn", uxExtSpect.util.StringOf.object$( this ) ); };
HTMLCollection.prototype.extspectString._name = 'HTMLCollection#extspectString';

KeyboardEvent.prototype.extspectString = function () {
	var dataString = '';
	if ( "keyCode" in this ) { dataString = uxExtSpect.util.StringOf.keyCode$( this.keyCode ) + ', ' + this.charCode; }
	return uxExtSpect.util.StringOf.embrace$( "KybrdEvent", dataString || uxExtSpect.util.StringOf.object$( this ) );
};
KeyboardEvent.prototype.extspectString._name = 'KeyboardEvent#extspectString';

MouseEvent.prototype.extspectString = function () {
	var dataString;
	if ( "button" in this ) {
		dataString = 'btn = ' + this.button + ' dtl(' + this.detail + ')' +
			' @Clnt(' + this.clientX + ' ' + this.clientY + ')';
		// add pgOffst to Clnt(?) to get actual (scrolled ) pstn (Flanagan , pg. 408)
		//		' @pgOffst(' + window.pageXOffset + ' ' + window.pageYOffset + ')' + // NOT MSIE
	}
	return uxExtSpect.util.StringOf.embrace$( "MsEvnt", dataString || uxExtSpect.util.StringOf.object$( this ) );
};
MouseEvent.prototype.extspectString._name = 'MouseEvent#extspectString';

NamedNodeMap.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "NmdNodeMap", uxExtSpect.util.StringOf.object$( this ) ); };
NamedNodeMap.prototype.extspectString._name = 'NamedNodeMap#extspectString';

//Node.prototype.extspectString =
//	function ( ) { return uxExtSpect.util.StringOf.embrace$( "Node" , uxExtSpect.util.StringOf.object$( this ) ) }
//Node.prototype.extspectString._name = 'Node#extspectString'

NodeList.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "NodeList", uxExtSpect.util.StringOf.object$( this ) ); };
NodeList.prototype.extspectString._name = 'NodeList#extspectString';
/*
 HTMLScriptElement.prototype.extspectString =
 function ( ) { return uxExtSpect.util.StringOf.embrace$( "SCRIPT" , this.src ) }
 HTMLScriptElement.prototype.extspectString._name = 'HTMLScriptElement#extspectString'*/

Text.prototype.extspectString =
	function () { return uxExtSpect.util.StringOf.embrace$( "Text", uxExtSpect.util.StringOf.object$( this ) );};
Text.prototype.extspectString._name = 'Text#extspectString';

/*Attr,
 CDATASection,
 CharacterData,
 Comment,
 Document,
 DocumentFragment,
 DocumentType,
 DOMException,
 DOMImplementation,
 Element,
 Entity,
 EntityReference,
 NamedNodeMap,
 Namespace,
 Node,
 NodeList,
 Notation,
 ProcessingInstruction,
 Text,
 Range,
 XMLSerializer,
 DOMParser;

 CSS2Properties,
 CSSRule,
 CSSStyleRule,
 CSSImportRule,
 CSSMediaRule,
 CSSFontFaceRule,
 CSSPageRule,
 CSSRuleList,
 CSSStyleSheet,
 StyleSheet,
 StyleSheetList;

 HTMLDocument,
 HTMLElement,
 HTMLCollection,
 HTMLAnchorElement,
 HTMLAreaElement,
 HTMLBaseElement,
 HTMLQuoteElement,
 HTMLBodyElement,
 HTMLBRElement,
 HTMLButtonElement,
 HTMLCanvasElement,
 HTMLTableColElement,
 HTMLModElement,
 HTMLDivElement,
 HTMLDListElement,
 HTMLFieldSetElement,
 HTMLFormElement,
 HTMLFrameElement,
 HTMLFrameSetElement,
 HTMLHeadElement,
 HTMLHeadingElement,
 HTMLHRElement,
 HTMLHtmlElement,
 HTMLIFrameElement,
 HTMLImageElement,
 HTMLInputElement,
 HTMLLabelElement,
 HTMLLegendElement,
 HTMLLIElement,
 HTMLLinkElement,
 HTMLMapElement,
 HTMLMetaElement,
 HTMLObjectElement,
 HTMLOListElement,
 HTMLOptGroupElement,
 HTMLOptionElement,
 HTMLParagraphElement,
 HTMLParamElement,
 HTMLPreElement,
 HTMLScriptElement,
 HTMLSelectElement,
 HTMLSpanElement,
 HTMLStyleElement,
 HTMLTableElement,
 HTMLTableSectionElement,
 HTMLTableCellElement,
 HTMLTableDataCellElement,
 HTMLHeaderRowCellElement,
 HTMLTableRowElement,
 HTMLTextAreaElement,
 HTMLTitleElement,
 HTMLUListElement,
 HTMLUnknownElement,*/
