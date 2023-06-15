<script lang="ts">
    import {onMount} from 'svelte';
    let _comboboxNode: any;
    let _buttonNode: any;
    let _listboxNode: any
    let _listboxHasVisualFocus = false;
    let _filter = '';
    let _option:any = null;
    let _isBoth = false;
    let _comboboxHasVisualFocus = false;

    let _isNone = false;
    let _isList = false;
    let _firstOption: any = null;
   let _lastOption: any = null;
   let _allOptions: any = [];
   let _hasHover = false;

   let _filteredOptions: any = [];
    class ComboboxAutocomplete {
 constructor(comboboxNode:any, buttonNode:any, listboxNode:any) {
   _comboboxNode = comboboxNode;
   _buttonNode = buttonNode;
   _listboxNode = listboxNode;

   _comboboxHasVisualFocus = false;
   _listboxHasVisualFocus = false;

   
   _isNone = false;
   
   _isBoth = false;

  

   _option = null;
   
   _filter = '';

   var autocomplete = _comboboxNode.getAttribute('aria-autocomplete');

   if (typeof autocomplete === 'string') {
     autocomplete = autocomplete.toLowerCase();
     _isNone = autocomplete === 'none';
     _isList = autocomplete === 'list';
     _isBoth = autocomplete === 'both';
   } else {
     // default value of autocomplete
     _isNone = true;
   }

   _comboboxNode.addEventListener(
     'keydown',
     this.onComboboxKeyDown.bind(this)
   );
   _comboboxNode.addEventListener(
     'keyup',
     this.onComboboxKeyUp.bind(this)
   );
   _comboboxNode.addEventListener(
     'click',
     this.onComboboxClick.bind(this)
   );
   _comboboxNode.addEventListener(
     'focus',
     this.onComboboxFocus.bind(this)
   );
   _comboboxNode.addEventListener('blur', this.onComboboxBlur.bind(this));

   document.body.addEventListener(
     'pointerup',
     this.onBackgroundPointerUp.bind(this),
     true
   );

   // initialize pop up menu

   _listboxNode.addEventListener(
     'pointerover',
     this.onListboxPointerover.bind(this)
   );
   _listboxNode.addEventListener(
     'pointerout',
     this.onListboxPointerout.bind(this)
   );

   // Traverse the element children of domNode: configure each with
   // option role behavior and store reference in.options array.
   var nodes = _listboxNode.getElementsByTagName('LI');

   for (var i = 0; i < nodes.length; i++) {
     var node = nodes[i];
     _allOptions.push(node);

     node.addEventListener('click', this.onOptionClick.bind(this));
     node.addEventListener('pointerover', this.onOptionPointerover.bind(this));
     node.addEventListener('pointerout', this.onOptionPointerout.bind(this));
   }

   this.filterOptions();

   // Open Button

   var button = _comboboxNode.nextElementSibling;

   if (button && button.tagName === 'BUTTON') {
     button.addEventListener('click', this.onButtonClick.bind(this));
   }
 }

 getLowercaseContent(node:any) {
   return node.textContent.toLowerCase();
 }

 isOptionInView(option:any) {
   var bounding = option.getBoundingClientRect();
   return (
     bounding.top >= 0 &&
     bounding.left >= 0 &&
     bounding.bottom <=
       (window.innerHeight || document.documentElement.clientHeight) &&
     bounding.right <=
       (window.innerWidth || document.documentElement.clientWidth)
   );
 }

 setActiveDescendant(option:any) {
   if (option && _listboxHasVisualFocus) {
     _comboboxNode.setAttribute('aria-activedescendant', option.id);
     if (!this.isOptionInView(option)) {
       option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
     }
   } else {
     _comboboxNode.setAttribute('aria-activedescendant', '');
   }
 }

 setValue(value: any) {
   _filter = value;
   _comboboxNode.value = _filter;
   _comboboxNode.setSelectionRange(_filter.length, _filter.length);
   this.filterOptions();
 }

 setOption(option:any, flag:any) {
   if (typeof flag !== 'boolean') {
     flag = false;
   }

   if (option) {
     _option = option;
     this.setCurrentOptionStyle(_option);
     this.setActiveDescendant(_option);

     if (_isBoth) {
       _comboboxNode.value = _option.textContent;
       if (flag) {
         _comboboxNode.setSelectionRange(
           _option.textContent.length,
           _option.textContent.length
         );
       } else {
         _comboboxNode.setSelectionRange(
           _filter.length,
           _option.textContent.length
         );
       }
     }
   }
 }

 setVisualFocusCombobox() {
   _listboxNode.classList.remove('focus');
   _comboboxNode.parentNode.classList.add('focus'); // set the focus class to the parent for easier styling
   _comboboxHasVisualFocus = true;
   _listboxHasVisualFocus = false;
   this.setActiveDescendant(false);
 }

 setVisualFocusListbox() {
   _comboboxNode.parentNode.classList.remove('focus');
   _comboboxHasVisualFocus = false;
   _listboxHasVisualFocus = true;
   _listboxNode.classList.add('focus');
   this.setActiveDescendant(_option);
 }

 removeVisualFocusAll() {
   _comboboxNode.parentNode.classList.remove('focus');
   _comboboxHasVisualFocus = false;
   _listboxHasVisualFocus = false;
   _listboxNode.classList.remove('focus');
   _option = null;
   this.setActiveDescendant(false);
 }

 // ComboboxAutocomplete Events

 filterOptions() {
   // do not filter any options if autocomplete is none
   if (_isNone) {
     _filter = '';
   }

   var option = null;
   var currentOption = _option;
   var filter = _filter.toLowerCase();

   _filteredOptions = [];
   _listboxNode.innerHTML = '';

   for (var i = 0; i < _allOptions.length; i++) {
     option = _allOptions[i];
     if (
       filter.length === 0 ||
       this.getLowercaseContent(option).indexOf(filter) === 0
     ) {
       _filteredOptions.push(option);
       _listboxNode.appendChild(option);
     }
   }

   // Use populated options array to initialize firstOption and lastOption.
   var numItems = _filteredOptions.length;
   if (numItems > 0) {
     _firstOption = _filteredOptions[0];
     _lastOption = _filteredOptions[numItems - 1];

     if (currentOption && _filteredOptions.indexOf(currentOption) >= 0) {
       option = currentOption;
     } else {
       option = _firstOption;
     }
   } else {
     _firstOption = null;
     option = null;
     _lastOption = null;
   }

   return option;
 }

 setCurrentOptionStyle(option:any) {
   for (var i = 0; i < _filteredOptions.length; i++) {
     var opt = _filteredOptions[i];
     if (opt === option) {
       opt.setAttribute('aria-selected', 'true');
       if (
         _listboxNode.scrollTop + _listboxNode.offsetHeight <
         opt.offsetTop + opt.offsetHeight
       ) {
         _listboxNode.scrollTop =
           opt.offsetTop + opt.offsetHeight - _listboxNode.offsetHeight;
       } else if (_listboxNode.scrollTop > opt.offsetTop + 2) {
         _listboxNode.scrollTop = opt.offsetTop;
       }
     } else {
       opt.removeAttribute('aria-selected');
     }
   }
 }

 getPreviousOption(currentOption: any) {
   if (currentOption !== _firstOption) {
     var index = _filteredOptions.indexOf(currentOption);
     return _filteredOptions[index - 1];
   }
   return _lastOption;
 }

 getNextOption(currentOption:any) {
   if (currentOption !== _lastOption) {
     var index = _filteredOptions.indexOf(currentOption);
     return _filteredOptions[index + 1];
   }
   return _firstOption;
 }

 /* MENU DISPLAY METHODS */

 doesOptionHaveFocus() {
   return _comboboxNode.getAttribute('aria-activedescendant') !== '';
 }

 isOpen() {
   return _listboxNode.style.display === 'block';
 }

 isClosed() {
   return _listboxNode.style.display !== 'block';
 }

 hasOptions() {
   return _filteredOptions.length;
 }

 open() {
   _listboxNode.style.display = 'block';
   _comboboxNode.setAttribute('aria-expanded', 'true');
   _buttonNode.setAttribute('aria-expanded', 'true');
 }

 close(force:any) {
   if (typeof force !== 'boolean') {
     force = false;
   }

   if (
     force ||
     (!_comboboxHasVisualFocus &&
       !_listboxHasVisualFocus &&
       !_hasHover)
   ) {
     this.setCurrentOptionStyle(false);
     _listboxNode.style.display = 'none';
     _comboboxNode.setAttribute('aria-expanded', 'false');
     _buttonNode.setAttribute('aria-expanded', 'false');
     this.setActiveDescendant(false);
     _comboboxNode.parentNode.classList.add('focus');
   }
 }

 /* combobox Events */

 onComboboxKeyDown(event:any) {
   var flag = false,
     altKey = event.altKey;

   if (event.ctrlKey || event.shiftKey) {
     return;
   }

   switch (event.key) {
     case 'Enter':
       if (_listboxHasVisualFocus) {
         this.setValue(_option.textContent);
       }
       this.close(true);
       this.setVisualFocusCombobox();
       flag = true;
       break;

     case 'Down':
     case 'ArrowDown':
       if (_filteredOptions.length > 0) {
         if (altKey) {
           this.open();
         } else {
           this.open();
           if (
             _listboxHasVisualFocus ||
             (_isBoth && _filteredOptions.length > 1)
           ) {
             this.setOption(this.getNextOption(_option), true);
             this.setVisualFocusListbox();
           } else {
             this.setOption(_firstOption, true);
             this.setVisualFocusListbox();
           }
         }
       }
       flag = true;
       break;

     case 'Up':
     case 'ArrowUp':
       if (this.hasOptions()) {
         if (_listboxHasVisualFocus) {
           this.setOption(this.getPreviousOption(_option), true);
         } else {
           this.open();
           if (!altKey) {
             this.setOption(_lastOption, true);
             this.setVisualFocusListbox();
           }
         }
       }
       flag = true;
       break;

     case 'Esc':
     case 'Escape':
       if (this.isOpen()) {
         this.close(true);
         _filter = _comboboxNode.value;
         this.filterOptions();
         this.setVisualFocusCombobox();
       } else {
         this.setValue('');
         _comboboxNode.value = '';
       }
       _option = null;
       flag = true;
       break;

     case 'Tab':
       this.close(true);
       if (_listboxHasVisualFocus) {
         if (_option) {
           this.setValue(_option.textContent);
         }
       }
       break;

     case 'Home':
       _comboboxNode.setSelectionRange(0, 0);
       flag = true;
       break;

     case 'End':
       var length = _comboboxNode.value.length;
       _comboboxNode.setSelectionRange(length, length);
       flag = true;
       break;

     default:
       break;
   }

   if (flag) {
     event.stopPropagation();
     event.preventDefault();
   }
 }

 isPrintableCharacter(str:any) {
   return str.length === 1 && str.match(/\S| /);
 }

 onComboboxKeyUp(event:any) {
   var flag = false,
     option = null,
     char = event.key;

   if (this.isPrintableCharacter(char)) {
     _filter += char;
   }

   // this is for the case when a selection in the textbox has been deleted
   if (_comboboxNode.value.length < _filter.length) {
     _filter = _comboboxNode.value;
     _option = null;
     this.filterOptions();
   }

   if (event.key === 'Escape' || event.key === 'Esc') {
     return;
   }

   switch (event.key) {
     case 'Backspace':
       this.setVisualFocusCombobox();
       this.setCurrentOptionStyle(false);
       _filter = _comboboxNode.value;
       _option = null;
       this.filterOptions();
       flag = true;
       break;

     case 'Left':
     case 'ArrowLeft':
     case 'Right':
     case 'ArrowRight':
     case 'Home':
     case 'End':
       if (_isBoth) {
         _filter = _comboboxNode.value;
       } else {
         _option = null;
         this.setCurrentOptionStyle(false);
       }
       this.setVisualFocusCombobox();
       flag = true;
       break;

     default:
       if (this.isPrintableCharacter(char)) {
         this.setVisualFocusCombobox();
         this.setCurrentOptionStyle(false);
         flag = true;

         if (_isList || _isBoth) {
           option = this.filterOptions();
           if (option) {
             if (this.isClosed() && _comboboxNode.value.length) {
               this.open();
             }

             if (
               this.getLowercaseContent(option).indexOf(
                 _comboboxNode.value.toLowerCase()
               ) === 0
             ) {
               _option = option;
               if (_isBoth || _listboxHasVisualFocus) {
                 this.setCurrentOptionStyle(option);
                 if (_isBoth) {
                   this.setOption(option, true);
                 }
               }
             } else {
               _option = null;
               this.setCurrentOptionStyle(false);
             }
           } else {
             this.close(true);
             _option = null;
             this.setActiveDescendant(false);
           }
         } else if (_comboboxNode.value.length) {
           this.open();
         }
       }

       break;
   }

   if (flag) {
     event.stopPropagation();
     event.preventDefault();
   }
 }

 onComboboxClick() {
   if (this.isOpen()) {
     this.close(true);
   } else {
     this.open();
   }
 }

 onComboboxFocus() {
   _filter = _comboboxNode.value;
   this.filterOptions();
   this.setVisualFocusCombobox();
   _option = null;
   this.setCurrentOptionStyle(null);
 }

 onComboboxBlur() {
   this.removeVisualFocusAll();
 }

 onBackgroundPointerUp(event:any) {
   if (
     !_comboboxNode.contains(event.target) &&
     !_listboxNode.contains(event.target) &&
     !_buttonNode.contains(event.target)
   ) {
     _comboboxHasVisualFocus = false;
     this.setCurrentOptionStyle(null);
     this.removeVisualFocusAll();
     setTimeout(this.close.bind(this, true), 300);
   }
 }

 onButtonClick() {
   if (this.isOpen()) {
     this.close(true);
   } else {
     this.open();
   }
   _comboboxNode.focus();
   this.setVisualFocusCombobox();
 }

 /* Listbox Events */

 onListboxPointerover() {
   _hasHover = true;
 }

 onListboxPointerout() {
   _hasHover = false;
   setTimeout(this.close.bind(this, false), 300);
 }

 // Listbox Option Events

 onOptionClick(event:any) {
   _comboboxNode.value = event.target.textContent;
   this.close(true);
 }

 onOptionPointerover() {
   _hasHover = true;
   this.open();
 }

 onOptionPointerout() {
   _hasHover = false;
   setTimeout(this.close.bind(this, false), 300);
 }
}
onMount(() => {
   var comboboxes = document.querySelectorAll('.combobox-list');

   for (var i = 0; i < comboboxes.length; i++) {
       var combobox = comboboxes[i];
       var comboboxNode = combobox.querySelector('input');
       var buttonNode = combobox.querySelector('button');
       var listboxNode = combobox.querySelector('[role="listbox"]');
       new ComboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
   }
} )
</script>
<label for="cb1-input">State</label>
<div class="combobox combobox-list">
 <div class="group">
   <input id="cb1-input" class="cb_edit" type="text" role="combobox" aria-autocomplete="both" aria-expanded="false" aria-controls="cb1-listbox">
   <button type="button" id="cb1-button" aria-label="States" aria-expanded="false" aria-controls="cb1-listbox" tabindex="-1">
     <svg width="18" height="16" aria-hidden="true" focusable="false" style="forced-color-adjust: auto">
       <polygon class="arrow" stroke-width="0" fill-opacity="0.75" fill="currentcolor" points="3,6 15,6 9,14"></polygon>
     </svg>
   </button>
 </div>
 <ul id="cb1-listbox" role="listbox" aria-label="States">
   <li id="lb1-al" role="option">Alabama</li>
   <li id="lb1-ak" role="option">Alaska</li>
   <li id="lb1-as" role="option">American Samoa</li>
   <li id="lb1-az" role="option">Arizona</li>
   <li id="lb1-ar" role="option">Arkansas</li>
   <li id="lb1-ca" role="option">California</li>
   <li id="lb1-co" role="option">Colorado</li>
   <li id="lb1-ct" role="option">Connecticut</li>
   <li id="lb1-de" role="option">Delaware</li>
   <li id="lb1-dc" role="option">District of Columbia</li>
   <li id="lb1-fl" role="option">Florida</li>
   <li id="lb1-ga" role="option">Georgia</li>
   <li id="lb1-gm" role="option">Guam</li>
   <li id="lb1-hi" role="option">Hawaii</li>
   <li id="lb1-id" role="option">Idaho</li>
   <li id="lb1-il" role="option">Illinois</li>
   <li id="lb1-in" role="option">Indiana</li>
   <li id="lb1-ia" role="option">Iowa</li>
   <li id="lb1-ks" role="option">Kansas</li>
   <li id="lb1-ky" role="option">Kentucky</li>
   <li id="lb1-la" role="option">Louisiana</li>
   <li id="lb1-me" role="option">Maine</li>
   <li id="lb1-md" role="option">Maryland</li>
   <li id="lb1-ma" role="option">Massachusetts</li>
   <li id="lb1-mi" role="option">Michigan</li>
   <li id="lb1-mn" role="option">Minnesota</li>
   <li id="lb1-ms" role="option">Mississippi</li>
   <li id="lb1-mo" role="option">Missouri</li>
   <li id="lb1-mt" role="option">Montana</li>
   <li id="lb1-ne" role="option">Nebraska</li>
   <li id="lb1-nv" role="option">Nevada</li>
   <li id="lb1-nh" role="option">New Hampshire</li>
   <li id="lb1-nj" role="option">New Jersey</li>
   <li id="lb1-nm" role="option">New Mexico</li>
   <li id="lb1-ny" role="option">New York</li>
   <li id="lb1-nc" role="option">North Carolina</li>
   <li id="lb1-nd" role="option">North Dakota</li>
   <li id="lb1-mp" role="option">Northern Marianas Islands</li>
   <li id="lb1-oh" role="option">Ohio</li>
   <li id="lb1-ok" role="option">Oklahoma</li>
   <li id="lb1-or" role="option">Oregon</li>
   <li id="lb1-pa" role="option">Pennsylvania</li>
   <li id="lb1-pr" role="option">Puerto Rico</li>
   <li id="lb1-ri" role="option">Rhode Island</li>
   <li id="lb1-sc" role="option">South Carolina</li>
   <li id="lb1-sd" role="option">South Dakota</li>
   <li id="lb1-tn" role="option">Tennessee</li>
   <li id="lb1-tx" role="option">Texas</li>
   <li id="lb1-ut" role="option">Utah</li>
   <li id="lb1-ve" role="option">Vermont</li>
   <li id="lb1-va" role="option">Virginia</li>
   <li id="lb1-vi" role="option">Virgin Islands</li>
   <li id="lb1-wa" role="option">Washington</li>
   <li id="lb1-wv" role="option">West Virginia</li>
   <li id="lb1-wi" role="option">Wisconsin</li>
   <li id="lb1-wy" role="option">Wyoming</li>
 </ul>
</div>
<style>
.combobox-list {
 position: relative;
}

.combobox .group {
 display: inline-flex;
 padding: 4px;
 cursor: pointer;
}

.combobox input,
.combobox button {
 background-color: white;
 color: black;
 box-sizing: border-box;
 height: 24px;
 padding: 0;
 margin: 0;
 vertical-align: bottom;
 border: 1px solid gray;
 position: relative;
 cursor: pointer;
}

.combobox input {
 width: 150px;
 border-right: none;
 outline: none;
 font-size: 87.5%;
 padding: 1px 3px;
}

.combobox button {
 width: 19px;
 border-left: none;
 outline: none;
 color: rgb(0 90 156);
}

.combobox button[aria-expanded="true"] svg {
 transform: rotate(180deg) translate(0, -3px);
}

ul[role="listbox"] {
 margin: 0;
 padding: 0;
 position: absolute;
 left: 4px;
 top: 28px;
 list-style: none;
 background-color: white;
 display: none;
 box-sizing: border-box;
 border: 2px currentcolor solid;
 max-height: 250px;
 width: 168px;
 overflow: scroll;
 overflow-x: hidden;
 font-size: 87.5%;
 cursor: pointer;
}

ul[role="listbox"] li[role="option"] {
 margin: 0;
 display: block;
 padding-left: 3px;
 padding-top: 2px;
 padding-bottom: 2px;
}

/* focus and hover styling */

.combobox .group.focus,
.combobox .group:hover {
 padding: 2px;
 border: 2px solid currentcolor;
 border-radius: 4px;
}

.combobox .group.focus polygon,
.combobox .group:hover polygon {
 fill-opacity: 1;
}

.combobox .group.focus input,
.combobox .group.focus button,
.combobox .group input:hover,
.combobox .group button:hover {
 background-color: #def;
}

[role="listbox"].focus [role="option"][aria-selected="true"],
[role="listbox"] [role="option"]:hover {
 background-color: #def;
 padding-top: 0;
 padding-bottom: 0;
 border-top: 2px solid currentcolor;
 border-bottom: 2px solid currentcolor;
}</style>