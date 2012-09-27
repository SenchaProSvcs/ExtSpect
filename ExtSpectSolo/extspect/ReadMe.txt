
Release notes for ExtSpect 0.2.08

by Jim.Soper@extjs.com


========== INTRODUCTION

Welcome to the brand new ExtSpect, a plugin inspector Sencha Touch 2.0
written in Sencha Touch 2.0. The first version focusses on components,
but we will be adding features to allow you to look at other parts of Touch.

Please note:

o Please do NOT share this outside of the Sencha. This is a pre-release
version, and it should be tested first, and the code and legal issues cleaned up.


========== INSTALLATION

For users of the demos app, ExtSpectSolo, the
index.html file expects that a touch2 directory will be a sibling of
the app directory. Please make adjustments in index.html as needed.

For installation of ExtSpect as a plugin, there are 2 things that you must
do, and a couple more optional choices.

o The 'extspect' folder can be found inside the folder for the demo app
(CrimeFinder or ExtSpectSolo) included in the zipped file. Copy only the
'extspect' folder to just inside your app's main folder, at the same level
as your index.html file.

o Somewhere inside the views that you build, add ExtSpect as a component.
Typically, this will be in you top level viewport, so it would look like this:

	Ext.Viewport.add( Ext.create( 'extspect.ExtSpect', { app:  MyApp.app } ) )

The ExtSpect class extends Ext.Panel, but it can also be added using the xtype
'extspect'. There are values for the title and iconCls, so it should fit into a
tab panel with no further work.

o There is a config option to the ExtSpect class called app. This is required.
It typically looks something like this:

	Ext.Viewport.add( Ext.create( 'extspect.ExtSpect', { app : MyApp.app } ) )

o The file that adds ExtSpect to a container should/must also declare

	requires : [ 'extspect.ExtSpect' ] ,


========== USAGE

Using ExtSpect is fairly straightforward. The 'tree panel' on the left lets you
look at the component or class hierarchy of the enclosing app. The object panel
on the right shows you the current object and the various properties it contains.
Touching an object on the left displays it in the object window on the right.
If you touch a property, and it contains a structured value such as an object
or array, the object window will show you that object. There is no response
to atomic values such as numbers or strings.

Note that the lists do not automatically update for changes in data.
They do, however, update on a repaint. To refresh a list, flip to a
sibling tab, and back again.

The [Group] button at the bottom attempts to group the properties according
to categories found in the property name. Properties with no identified
category are listed at the bottom, according to the datatype of their value.

Users of ExtSpectCrimeFinder demo will find an ExtSpect tab at the bottom
of the main window.


========== CLASS ABBREVIATIONS

Some objects appear wrapped with braces,with letters in front of them.
Those letters indicate the name of the class the object instantiates. For
example, O{0...} is an instance of Object, and it has no properties.
A default config may show {21p/1m...}. This is an object that belongs to
no class, and has 21 properties and 1 method. Some of the abbreviations
for classes are:

TC : TemplateClass (not documented)
App : Ext.app.Application
MC : Ext.util.MixedCollection
AMC : Ext.util.AbstractMixedCollection
IC : Ext.ItemCollection
E : Ext.dom.Element

DTL : DOMTokenList
HC : HTMLCollection
NL : NodeList
NNM : NamedNodeMap
RE : RegularExpression


========== util.StringOf and util.Trace packages

These are packages that I developed in 2011. StringOf prints out
values in some reasonably concise yet informative way. The primary
function is StringOf.to$(). ExtSpect uses it heavily.

util.Trace is not needed by ExtSpect, but I use it heavily in my coding.
It offers three major functions:

Trace.start() and  Trace.end() work as a pair. With no args, Trace.start()
uses console.group() to print out the name of the containing function
AND the name of the function that called it, separated by a diamond ? .
They are followed by then names of each of the arguments and
their values. If you give an argument, such as Trace.start( this ), it
prints out that value, and not the input arguments. Trace.end uses
console.groupEnd() to close the group, indicated in Chrome/Safari
by a triangle. If you give Trace.end() an argument, it prints that value out.

Trace.vars() prints out the calling function, and the function that contains
it using a simple console.log(). Arguments may be added in string - value
pairs, usually the name of a variable and it's value. For example,

	Trace.vars( 'index' , index , 'value' , value )

might print out as

	containingFn?callingFn : index = 1 , value = 'xyz'

ExtSpect loads util.StringOf in automatically.


========== KNOWN BUGS

o Sorting by property names may leave some properties out of order.
This is especially true in the methods pane, when there are 400+ methods
to sort through.

o If you set the startObject feature, the title needs more space, and
if you press the <Back] button to get to it, the title shows Ext.Viewport.
The actual object is, however, the start object.

o At this point, the ExtSpect panel does not automatically fill the all
available space. I've had to set the height in ExtSpectNavigationVIew.js
manually in order to get something reasonable inside both the 2 demo apps.
Suggestions as to how to fix this would be appreciated.

