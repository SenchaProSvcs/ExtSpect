/* Stack overflows occur because createPropertyPointerRec => anon( sencha-touch-debug 3202 ) =>
 Ext.ClassManager.instantiate => anon => Ext.apply.ceate.Class => Ext.define.constructor =>
 Base.implement.initConfig => Ext.Object.merge => Ext.apply.clone which executes a deep clone
 for arrays and for objects
 */
Ext.define( 'uxExtSpect.object.rec.ExtRec',
	{  extend : 'uxExtSpect.object.rec.BaseRec',

		requires : ['Ext.MessageBox'],

		// Ext.ClassManager.classes lists most of the system classes you want
		// but not EventManager, Loader, Router, Viewport
		// some are duplicates

		properties : [
			// "Ajax" ,
			// "Animator" ,
			// "Array" ,
			"ClassManager" ,
			"ComponentManager" , // .all = O{} .map =O{}
			"ComponentQuery" , //.cache
			// "elements" , // too many
			// "Date" ,
			// "DateExtras" ,
			// "DomHelper" ,
			// "DomQuery" ,
			// "Error" ,
			// "EventManager" ,
			// "Function" ,
			// "JSON" ,
			"Loader" , // many descendant objects, need to control
			// "Logger" , // this is a utility class
			"ModelManager" , // = Ext.data.ModelManger .all
			"Msg" ,
			// "Number" ,
			// "Object" ,
			"Router" , // .appInstance => CrimeFinder // stack overflow
			// "String" ,
			"Viewport" ,
			// "viewport" ,
			// "application" , // this is just a function
			// "core" ,
			// "data" ,
			// "app" ,
			// "behavior" ,
			"browser" ,
			// "buildSettings" ,
			// many "cache" ,
			// "carousel" ,
			// "core" ,
			// big "data" ,
			// big "dataview" ,
			// "defaultSetupConfig" ,
			"documentBodyElement" ,
			"documentHeadElement" ,
			// "dom" ,
			// "elements"
			// "env" ,
			// "event" ,
			// "feature" ,
			// "field" ,
			/// "form" ,
			// "fx" ,
			// trouble "global" , // 499 properties
			// "is" ,
			// "lastRegisteredVersion" ,
			// "picker" ,
			// "proxy" ,
			"StoreManager" // StoreMgr
		]
		// eventDispatcher , managedListeners ,
	}
);

//Ext.env.OS
//Ext.is
//Ext.util.Observable
//
//Ext.Animator
//

//Ext.Feature


