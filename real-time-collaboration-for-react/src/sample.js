/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import React, { Component } from 'react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import CKBoxPlugin from '@ckeditor/ckeditor5-ckbox/src/ckbox';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import { NavLink } from "react-router-dom";
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';

import * as CKBox from 'ckbox';
import 'ckbox/dist/styles/ckbox.css';
import CloudServicesCommentsAdapter from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments/cloudservicescommentsadapter'
import CommentsRepository from '@ckeditor/ckeditor5-comments/src/comments/commentsrepository'
import NarrowSidebar from '@ckeditor/ckeditor5-comments/src/annotations/narrowsidebar'
import WideSidebar from '@ckeditor/ckeditor5-comments/src/annotations/widesidebar'
import ContextBase from '@ckeditor/ckeditor5-core/src/context'


/* CKECollabContext -------------------------> */
class CKECollabContext extends ContextBase {}

CKECollabContext.builtinPlugins = [
	CloudServicesCommentsAdapter,
	CloudServices,
	CommentsRepository,
	NarrowSidebar,
	WideSidebar,
	PresenceList
]

const initialData = `
	<h2>Bilingual Personality Disorder</h2>
`;

export default class Sample extends Component {
	state = {
		// You need this state to render the <CKEditor /> component after the layout is ready.
		// <CKEditor /> needs HTMLElements of `Sidebar` and `PresenceList` plugins provided through
		// the `config` property and you have to ensure that both are already rendered.
		isLayoutReady: false
	};

	sidebarElementRef = React.createRef();
	presenceListElementRef = React.createRef();
	ref = React.createRef();

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.ref && this.ref.current){
			 console.log('this.ref.current.editor',this.ref.current.editor);
		}
	}


	componentDidMount() {
		window.CKBox = CKBox;
		// When the layout is ready you can switch the state and render the `<CKEditor />` component.
		this.setState( { isLayoutReady: true } );
	}

	render() {
		return (
			<div className="App">
				{ this.renderHeader() }

				<main>
					<div className="message">
						<div className="centered">
							<h2>CKEditor 5 React integration of classic editor with real-time collaboration</h2>
							<p>
								Open this sample in another browser tab to start real-time collaborative editing.
							</p>
						</div>
					</div>

					<div className="centered">
						<div className="row-presence">
							<div ref={ this.presenceListElementRef } className="presence"></div>
						</div>
						{ this.renderEditor() }
					</div>
				</main>

				{ this.renderFooter() }
			</div>
		);
	}

	renderHeader() {
		return (
			<header>
				<div className="centered">
					<h1>
						<a href="https://ckeditor.com/ckeditor-5/" target="_blank" rel="noopener noreferrer">
							<img src="https://c.cksource.com/a/1/logos/ckeditor5.svg" alt="CKEditor 5 logo" /> CKEditor 5
						</a>
					</h1>

					<nav>
						<ul>
							<li>
								<a href="https://ckeditor.com/collaboration/" target="_blank" rel="noopener noreferrer">Website</a>
							</li>
							<li>
								<a href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration.html" target="_blank" rel="noopener noreferrer">Documentation</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}

	renderEditor() {
		// You should contact CKSource to get the CloudServices configuration.

		const cloudServicesConfig = this.props.configuration;
        
		return (
			<div className="row row-editor">

				{ /* Do not render the <CKEditor /> component before the layout is ready. */ }
				{ this.state.isLayoutReady && (
					<CKEditorContext
						config={{
							cloudServices: {
								tokenUrl: cloudServicesConfig.tokenUrl,
								webSocketUrl: cloudServicesConfig.webSocketUrl,
								bundleVersion: '35.1.0.1'
							},
							collaboration: { channelId: 'test'},
							sidebar: {
								container: this.sidebarElementRef.current
							},
							presenceList: {
								container: this.presenceListElementRef.current
							},
						}}
						context={CKECollabContext}
					>
					<CKEditor
						ref={this.ref}
						onReady={ editor => {
							console.log( 'Editor is ready to use!', editor );
							// Switch between inline and sidebar annotations according to the window size.
							this.boundRefreshDisplayMode = this.refreshDisplayMode.bind( this, editor );
							// Prevent closing the tab when any action is pending.
							this.boundCheckPendingActions = this.checkPendingActions.bind( this, editor );

							window.addEventListener( 'resize', this.boundRefreshDisplayMode );
							window.addEventListener( 'beforeunload', this.boundCheckPendingActions );
							this.refreshDisplayMode( editor );
						} }
						onChange={ ( event, editor ) => console.log( { event, editor } ) }
						editor={ ClassicEditor }
						config={ {
							plugins: [
								 Heading,// comment out this line and running the build will make error mapping-model-position-view-parent-not-found disappear
								CloudServices,
								PresenceList,
								Comments,
								RealTimeCollaborativeComments,
								RealTimeCollaborativeTrackChanges,
								TrackChanges,
								 Alignment,
								 Autoformat,
								 Bold,
								 PictureEditing,
								Essentials,
								 Image,
								 ImageCaption,
								 ImageResize,
								 ImageStyle,
								 ImageToolbar,
								 ImageUpload,
								 Italic,
								 Link,
								 Paragraph,
								Table,
								 TableToolbar,
								Underline,
								CKBoxPlugin
							],
							toolbar: [
								'heading',
								 '|',
								'comment',
								'trackChanges',
								'|',
								 'bold',
								 'italic',
								 '|',
								'alignment',
								 '|',
								 'imageUpload',
								 'link',
								 'insertTable',
							],
							cloudServices: {
								tokenUrl: cloudServicesConfig.tokenUrl,
								webSocketUrl: cloudServicesConfig.webSocketUrl,
								bundleVersion: '35.1.0.1'
							},

							collaboration: {
								channelId: cloudServicesConfig.channelId
							},
							ckbox: {
								tokenUrl: cloudServicesConfig.ckboxTokenUrl || cloudServicesConfig.tokenUrl
							},
							image: {
								toolbar: [
									'imageStyle:inline',
									'imageStyle:block',
									'imageStyle:side',
									'|',
									'toggleImageCaption',
									'imageTextAlternative',
									'|',
									'comment'
								]
							},
							table: {
								contentToolbar: [
									'tableColumn',
									'tableRow',
									'mergeTableCells'
								],
								tableToolbar: [ 'comment' ]
							},
							sidebar: {
								container: this.sidebarElementRef.current
							},
							presenceList: {
								container: this.presenceListElementRef.current
							},
							comments: {
								editorConfig: {
									extraPlugins: [ Bold, Italic, Underline, List, Autoformat ]
								}
							}
						} }
						data={ initialData }
					/>
					</CKEditorContext>
				) }
				<div ref={ this.sidebarElementRef } className="sidebar"></div>
			</div>
		);
	}

	renderFooter() {
		return (
			<footer>
				<div className="centered">
					<p>
						<a href="https://ckeditor.com/ckeditor-5/" target="_blank" rel="noopener noreferrer">CKEditor 5</a> – Rich text editor of tomorrow, available today
					</p>
					<p>
						Copyright © 2003-2022, <a href="https://cksource.com/" target="_blank" rel="noopener noreferrer">CKSource</a> Holding sp. z o.o. All rights reserved.
					</p>
				</div>
			</footer>
		);
	}

	refreshDisplayMode( editor ) {
		const annotationsUIs = editor.plugins.get( 'AnnotationsUIs' );
		const sidebarElement = this.sidebarElementRef.current;

		if ( window.innerWidth < 1070 ) {
			sidebarElement.classList.remove( 'narrow' );
			sidebarElement.classList.add( 'hidden' );
			annotationsUIs.switchTo( 'inline' );
		}
		else if ( window.innerWidth < 1300 ) {
			sidebarElement.classList.remove( 'hidden' );
			sidebarElement.classList.add( 'narrow' );
			annotationsUIs.switchTo( 'narrowSidebar' );
		}
		else {
			sidebarElement.classList.remove( 'hidden', 'narrow' );
			annotationsUIs.switchTo( 'wideSidebar' );
		}
	}

	checkPendingActions( editor, domEvt ) {
		if ( editor.plugins.get( 'PendingActions' ).hasAny ) {
			domEvt.preventDefault();
			domEvt.returnValue = true;
		}
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.boundRefreshDisplayMode );
		window.removeEventListener( 'beforeunload', this.boundCheckPendingActions );
	}
}
