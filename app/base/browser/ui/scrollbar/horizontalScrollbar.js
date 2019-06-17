/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { StandardWheelEvent } from 'base/browser/mouseEvent';
import { AbstractScrollbar } from 'base/browser/ui/scrollbar/abstractScrollbar';
import { ARROW_IMG_SIZE } from 'base/browser/ui/scrollbar/scrollbarArrow';
import { ScrollbarState } from 'base/browser/ui/scrollbar/scrollbarState';
import { ScrollbarVisibility } from 'base/common/scrollable';
export class HorizontalScrollbar extends AbstractScrollbar {
    constructor(scrollable, options, host) {
        super({
            lazyRender: options.lazyRender,
            host: host,
            scrollbarState: new ScrollbarState((options.horizontalHasArrows ? options.arrowSize : 0), (options.horizontal === ScrollbarVisibility.Hidden ? 0 : options.horizontalScrollbarSize), (options.vertical === ScrollbarVisibility.Hidden ? 0 : options.verticalScrollbarSize)),
            visibility: options.horizontal,
            extraScrollbarClassName: 'horizontal',
            scrollable: scrollable
        });
        if (options.horizontalHasArrows) {
            let arrowDelta = (options.arrowSize - ARROW_IMG_SIZE) / 2;
            let scrollbarDelta = (options.horizontalScrollbarSize - ARROW_IMG_SIZE) / 2;
            this._createArrow({
                className: 'left-arrow',
                top: scrollbarDelta,
                left: arrowDelta,
                bottom: undefined,
                right: undefined,
                bgWidth: options.arrowSize,
                bgHeight: options.horizontalScrollbarSize,
                onActivate: () => this._host.onMouseWheel(new StandardWheelEvent(null, 1, 0)),
            });
            this._createArrow({
                className: 'right-arrow',
                top: scrollbarDelta,
                left: undefined,
                bottom: undefined,
                right: arrowDelta,
                bgWidth: options.arrowSize,
                bgHeight: options.horizontalScrollbarSize,
                onActivate: () => this._host.onMouseWheel(new StandardWheelEvent(null, -1, 0)),
            });
        }
        this._createSlider(Math.floor((options.horizontalScrollbarSize - options.horizontalSliderSize) / 2), 0, undefined, options.horizontalSliderSize);
    }
    _updateSlider(sliderSize, sliderPosition) {
        this.slider.setWidth(sliderSize);
        this.slider.setLeft(sliderPosition);
    }
    _renderDomNode(largeSize, smallSize) {
        this.domNode.setWidth(largeSize);
        this.domNode.setHeight(smallSize);
        this.domNode.setLeft(0);
        this.domNode.setBottom(0);
    }
    onDidScroll(e) {
        this._shouldRender = this._onElementScrollSize(e.scrollWidth) || this._shouldRender;
        this._shouldRender = this._onElementScrollPosition(e.scrollLeft) || this._shouldRender;
        this._shouldRender = this._onElementSize(e.width) || this._shouldRender;
        return this._shouldRender;
    }
    _mouseDownRelativePosition(offsetX, offsetY) {
        return offsetX;
    }
    _sliderMousePosition(e) {
        return e.posx;
    }
    _sliderOrthogonalMousePosition(e) {
        return e.posy;
    }
    writeScrollPosition(target, scrollPosition) {
        target.scrollLeft = scrollPosition;
    }
}
//# sourceMappingURL=horizontalScrollbar.js.map