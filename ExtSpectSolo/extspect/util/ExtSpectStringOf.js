Ext.define( 'extspect.util.ExtSpectStringOf', { } );

if ( !window.StringOf ) { window.StringOf = {} }

Ext.extspectString = function () { return StringOf.embrace$( '', 'Ext' ); };
Ext.extspectString._name = 'Ext#extspectString';

StringOf.class$ = function ( value ) { return value.hasOwnProperty( "superclass" ) ? StringOf.object$( value, '' ) : null; };
StringOf.class$._name = 'StringOf.class$';

Ext.app.Application.prototype.extspectString =
	function () { return StringOf.embrace$( "App", StringOf.quote$( this.name ) ); };
Ext.app.Application.prototype.extspectString._name = 'Ext.app.Application#extspectString';
// StringOf.object$( ExtSpectSolo.app )

Ext.Loader.require( 'Ext.util.Collection',
	function () {
		Ext.util.Collection.prototype.extspectString =
			function () {
				return StringOf.class$( this ) ||
					StringOf.embrace$( "Clctn", StringOf.to$( this.items ) +
						( ( this.all.length > 0 ) ? ( ' ' + this.items.length + '/' + this.all.length ) : '' ) );
			};
		Ext.util.Collection.prototype.extspectString._name = 'Ext.util.Collection#extspectString';
	}
);

Ext.Loader.require( 'Ext.util.HashMap',
	function () {
		Ext.util.HashMap.prototype.extspectString =
			function () { return StringOf.embrace$( "HashMap", StringOf.to$( this.getValues() ) ); };
		Ext.util.HashMap.prototype.extspectString._name = 'Ext.util.HashMap#extspectString';
	}
);

Ext.util.MixedCollection.prototype.extspectString =
	function () { return StringOf.embrace$( "MxdClctn", StringOf.to$( this.items ) ); };
Ext.util.MixedCollection.prototype.extspectString._name = 'Ext.util.MixedCollection#extspectString';

// This is a subclass of MixedCollection
Ext.ItemCollection.prototype.extspectString =
	function () { return StringOf.embrace$( "ItmClctn", StringOf.to$( this.items ) ); };
Ext.ItemCollection.prototype.extspectString._name = 'Ext.ItemCollection#extspectString';

Ext.app.Controller.prototype.extspectString =
	function () {
		return  StringOf.class$( this ) ||
			StringOf.embrace$( "Cntrlr", StringOf.quote$( StringOf.lastPartOfName( this.$className, 1 ) ) );
	};
Ext.app.Controller.prototype.extspectString._name = 'Ext.util.MixedCollection#extspectString';

/*Ext.Loader.require( 'Ext.data.Model' )
 Ext.data.Model.prototype.extspectString =
 function ( ) { return StringOf.embrace$( "Model" , StringOf.to$( "????"))}///this.getName() ) ) }
 Ext.data.Model.prototype.extspectString._name = 'Ext.data.Model#extspectString'*/

Ext.Loader.require( 'Ext.data.Store',
	function () {
		Ext.data.Store.prototype.extspectString =
			function () { return StringOf.embrace$( "Store", StringOf.quote$( this.getStoreId() ) ); };
		Ext.data.Store.prototype.extspectString._name = 'Ext.data.Store#extspectString';
	}
);

Ext.Loader.require( 'Ext.data.proxy.Proxy',
	function () {
		Ext.data.proxy.Proxy.prototype.extspectString =
			function () { return StringOf.embrace$( "Proxy", StringOf.quote$( this.id ) ); };
		Ext.data.proxy.Proxy.prototype.extspectString._name = 'Ext.data.proxy.Proxy#extspectString';
	}
);

// Ext.Loader.require( 'Ext.app.Route' )
Ext.app.Route.prototype.extspectString =
	function () { return StringOf.embrace$( "Route", this.getUrl() + ':' + this.getAction() ); };
Ext.app.Route.prototype.extspectString._name = 'Ext.app.Route#extspectString';

Ext.Loader.require( 'Ext.data.Field',
	function () {
		Ext.data.Field.prototype.extspectString =
			function () { return StringOf.embrace$( "Field", StringOf.quote$( this.getName() ) ); };
		Ext.data.Field.prototype.extspectString._name = 'Ext.data.Field#extspectString';
	}
);

Ext.dom.Element.prototype.extspectString =
	function () { return StringOf.embrace$( "ExtElmnt", StringOf.quote$( this.id ) ); };
Ext.dom.Element.prototype.extspectString._name = 'Ext.dom.Element#extspectString';

// ========== JAVASCRIPT OBJECTS

Array.prototype.extspectString = function () { return StringOf.array$( this ); }; // typeof( [] ) -> 'object'
Array.prototype.extspectString._name = 'Array#extspectString';

// typeof( new Boolean( false ) ) -> 'object'
Boolean.prototype.extspectString = function () { return StringOf.embrace$( 'Bln', this ); };
Boolean.prototype.extspectString._name = 'Boolean#extspectString';
// console.log( new Boolean( false ).to$() )

Date.prototype.extspectString = function () { return StringOf.date$( this ); };
Date.prototype.extspectString._name = 'Date#extspectString';

// typeof( StringOf.to$ ) -> 'function'
Function.prototype.extspectString = function () {
	if ( "modelName" in this ) { return StringOf.embrace$( 'Model', StringOf.quote$( StringOf.functionName( this ) ) ); }
	return StringOf.functionName( this ) + '()';
};
Function.prototype.extspectString._name = 'Function#extspectString';
// console.log( StringOf.to$.to$() )

// typeof( new Number( '234' ) ) -> 'object'
Number.prototype.extspectString = function () { return StringOf.embrace$( 'Number', this ); };
Number.prototype.extspectString._name = 'Number#extspectString';
// console.log( new Number( '234' ).to$() )

RegExp.prototype.extspectString = function () { return StringOf.ellipsis$( StringOf.embrace$( 'RegExp', this ) ); };
RegExp.prototype.extspectString._name = 'RegExp#extspectString';

// typeof( new String( 'ABC' ) ) -> 'object'
String.prototype.extspectString = function () { return StringOf.embrace$( 'String', StringOf.quote$( this ) ); };
String.prototype.extspectString._name = 'String#extspectString';
// console.log( new String( 'ABC' ).to$() )

// ========== HTML/DOM OBJECTS

DOMTokenList.prototype.extspectString =
	function () { return StringOf.embrace$( "DomTknList", StringOf.object$( this ) ); };
DOMTokenList.prototype.extspectString._name = 'DOMTokenList#extspectString';

HTMLCollection.prototype.extspectString =
	function () { return StringOf.embrace$( "HtmlClctn", StringOf.object$( this ) ); };
HTMLCollection.prototype.extspectString._name = 'HTMLCollection#extspectString';

KeyboardEvent.prototype.extspectString = function () {
	var data$;
	if ( "keyCode" in this ) { data$ = StringOf.keyCode$( this.keyCode ) + ', ' + this.charCode; }
	return StringOf.embrace$( "KybrdEvent", data$ || StringOf.object$( this ) );
};
KeyboardEvent.prototype.extspectString._name = 'KeyboardEvent#extspectString';

MouseEvent.prototype.extspectString = function () {
	var data$;
	if ( "button" in this ) {
		data$ = 'btn = ' + this.button + ' dtl(' + this.detail + ')' +
			' @Clnt(' + this.clientX + ' ' + this.clientY + ')';
		// add pgOffst to Clnt(?) to get actual (scrolled ) pstn (Flanagan , pg. 408)
		//		' @pgOffst(' + window.pageXOffset + ' ' + window.pageYOffset + ')' + // NOT MSIE
	}
	return StringOf.embrace$( "MsEvnt", data$ || StringOf.object$( this ) );
};
MouseEvent.prototype.extspectString._name = 'MouseEvent#extspectString';

NamedNodeMap.prototype.extspectString =
	function () { return StringOf.embrace$( "NmdNodeMap", StringOf.object$( this ) ); };
NamedNodeMap.prototype.extspectString._name = 'NamedNodeMap#extspectString';

//Node.prototype.extspectString =
//	function ( ) { return StringOf.embrace$( "Node" , StringOf.object$( this ) ) }
//Node.prototype.extspectString._name = 'Node#extspectString'

NodeList.prototype.extspectString =
	function () { return StringOf.embrace$( "NodeList", StringOf.object$( this ) ); };
NodeList.prototype.extspectString._name = 'NodeList#extspectString';
/*
 HTMLScriptElement.prototype.extspectString =
 function ( ) { return StringOf.embrace$( "SCRIPT" , this.src ) }
 HTMLScriptElement.prototype.extspectString._name = 'HTMLScriptElement#extspectString'*/

Text.prototype.extspectString =
	function () { return StringOf.embrace$( "Text", StringOf.object$( this ) );};
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
 HTMLTableHeaderCellElement,
 HTMLTableRowElement,
 HTMLTextAreaElement,
 HTMLTitleElement,
 HTMLUListElement,
 HTMLUnknownElement,*/
