<template>
<div class="sc-var-panel sc-border_ sc-lines_ sc-center_ sc-bg_" id="smartcustomizer-container">
<div id="smartcustomizer-options"></div>
<div class="sc-var-price-block hide" id="smartcustomizer-price-container">
<div class="sc-var-label">Price:</div>
<div class="sc-var-price" id="orderform-price">
</div>
</div>
<button id="smartcustomizer-link"
class="smartcustomizer-link">Customize product<i></i></button>
</div>
</template>

<script setup>

defineProps({
    productOptions: Object,
    productsIds: Object
})

var Smartcustomizer = function () {
    this.scready = false;
    this.appName = 'smartcustomizer';
    this.baseUri = 'https://app.smartcustomizer.com/v2/';
    this.scWrapper = null;
    this.scIfrm = null;
    this.scLoaderScreen = null;
    this.scLink = null;
    this.productIds = {};
    this.productOptions = {"502":{"id":"502","name":"Ceramic Cup","description":"Ceramic Cup","sku":"","price":"5.00","option_groups":{"503":{"name":"Print","type":"opt_type_print","style":"1","class":"sc-select-type-img sc-select-style-circle","rule":"1","options":{"504":{"name":"Print Front","hex":null,"price":"0.00","thumb":"https:\/\/app.smartcustomizer.com\/uploads\/bTJIaEFENVF4S2FMOXlIQTN1RXlUdz09\/img\/catalog\/12\/504_thumb_en.jpg"}}}}}};
    this.selectedProductOptions = {};
    this.ssid = null;
    this.params = 'sa.order_form,mid.502';
    this.resolveField = {};
    this.priceFormat = '$[0.00]';
}

Smartcustomizer.prototype = {
    initApp: function () {
        this.initMessageListener();
    },


    renderStyleLinks: function () {

        var headElement = document.getElementsByTagName('head')[0];

        if (!document.getElementById('google-fonts')) {
            headElement.insertAdjacentHTML('beforeend', '<link href="https://fonts.googleapis.com" rel="preconnect" id="google-fonts">\
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>\
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"\
        rel="stylesheet"></link>');
        }

        var styles = ['normalize', 'variations', 'customize'];
        for (let i = 0; i < styles.length; i++) {
            let styleElement = document.getElementById('smartcustomizer-' + styles[i] + '-css');
            if (styleElement) {
                continue;
            }
            var ss = document.createElement("link");
            ss.type = 'text/css';
            ss.rel = 'stylesheet';
            ss.id = 'smartcustomizer-' + styles[i] + '-css';
            ss.href = this.baseUri + 'assets/styles/' + styles[i] + '.css?v=1000';
            headElement.appendChild(ss);
        }
    },


    renderProductElements: function () {

        if (!document.getElementById('smartcustomizer-wrapper')) {
            this.renderAppElements();
        }

        this.scLink = document.getElementsByClassName('smartcustomizer-link');

        


        var resolveFields = ['shop', 'uid'];
        var scLinkEl = document.getElementById("smartcustomizer-app");

        for (let i = 0; i < resolveFields.length; i++) {
            var rfv = scLinkEl.src.split(resolveFields[i] + "=")[1];
            if (rfv) {
                rfv = rfv.split('&');
                this.resolveField = { field: resolveFields[i], value: rfv[0] };
                break;
            }
        }

        if (this.scLink.length === 0) {
            this.scLink = [document.getElementById('smartcustomizer-link')];
        }

        for (var i = 0; i < this.scLink.length; i++) {
            this.scLink[i].addEventListener("click", function (event) {
                event.preventDefault();
                Smartcustomizer.openSC(this);
            }, false);
        }



    },



    renderProductOptions: function () {

        var optionsContainer = document.getElementById('smartcustomizer-options');

        var priceContainer = document.getElementById('smartcustomizer-price-container');

        if (optionsContainer.length === 0) {
            return;
        }

        var html = '';


        var optionGroups = Object.values(Smartcustomizer.productOptions)[0]['option_groups'];
		
		console.log(optionGroups);
		

        var productBasePrice = Object.values(Smartcustomizer.productOptions)[0]['price'];

        Object.keys(optionGroups).forEach(function (groupId) {

            var optionData = optionGroups[groupId];

            var options = optionData['options'];

            var addClass = optionData['rule'] == '1' && Object.keys(options).length === 1 && optionData['type'] !== 'opt_type_custom' ? ' hide' : '';

            html += '<fieldset data-id="' + groupId + '" data-style="' + optionData.style + '" data-rule="' + optionData['rule'] + '" data-type="' + optionData['type'] + '" class="sc-var-group ' + optionData['class'] + addClass + '" id="option-group-' + groupId + '">';

            html += '<legend class="sc-var-label">' + optionData['name'] + '</legend>';

            var firstItem = true;

            if (optionData.style !== '7') {

             //   console.log(Object.keys(options));

                console.log(options);

                 Object.keys(options).forEach(function (optionId) {
					 
					var option = options[optionId];
     
                    var checked = firstItem && (optionData['rule'] == '1' || optionData['type'] === 'opt_type_print') ? 'checked' : '';
                    firstItem = false;

                    html += '<input type="checkbox" id="option-' + optionId + '" data-id="' + optionId + '" data-gid="' + groupId + '" name="option-group-' + groupId + '" value="' + optionId + '" ' + checked + ' class="option">';
                    var style = '';
					
                    if (['1', '2', '3', '4'].indexOf(optionData.style) >= 0) {
						
						if (option['thumb']) {
							style = 'style="background: center center / cover url(\'' + option['thumb'] + '\');"';
						}
						else if (option['hex']){
							  style = 'style="background-color: ' + option['hex'] + ';"';
						}
						
                    }

                    html += '<label for="option-' + optionId + '" ' + style + '>';
                    html += '<span class="sc-txt">' + option['name'] + getFormattedOptionPrice( option['price']) + '</span>';
                    html += '</label>';

                });


            }
            else {

                html += '<div class="sc-select">';
                html += '<select id="option-group-select-' + groupId + '" data-gid="' + groupId + '" + class="sc-select-input" name="option-group-select' + groupId + '">';
                Object.keys(options).forEach(function (optionId) {
					var option = options[optionId];
                    var selected = firstItem && optionData['rule'] == '1' ? 'selected' : '';
                    firstItem = false;
                    html += '<option value="' + optionId + '" ' + selected + '> ' + option['name'] + getFormattedOptionPrice( option['price']) + '</option>';
                });

                html += '</select>';
                html += '<svg aria-hidden="true" focusable="false" role="presentation" class="sc-icon-down" viewBox="0 0 10 6">';
                html += '<path fill-rule="evenodd" clip-rule="evenodd"';
                html += ' d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"';
                html += ' fill="currentColor">';
                html += '</path>';
                html += '</svg>';
                html += '</div>';

            }

            html += '</fieldset>';

        });

        optionsContainer.innerHTML = html;

        var productOptions = optionsContainer.querySelectorAll('input, select');


        updateSelectedOptions();


        function getFormattedOptionPrice(price){
            price = parseFloat(price);
            return price > 0 ? ' (+' + Smartcustomizer.parsePrice(price) + ')' : '';
        }


        function getOptionByID(options, id){
            return options.find(option => option.id == id);
        }


        function updateSelectedOptions() {

            var groups = optionsContainer.querySelectorAll('fieldset');
            
            Smartcustomizer.selectedProductOptions = {};

            var price = parseFloat(productBasePrice);

            groups.forEach(function (group) {
                var groupId = group.getAttribute('data-id');
                Smartcustomizer.selectedProductOptions[groupId] = [];

                var selectedOptions = group.querySelectorAll('input:checked, select');

                selectedOptions.forEach(function (option) {
                    Smartcustomizer.selectedProductOptions[groupId].push(option.value);
                    var optionItem = optionGroups[groupId]['options'][option.value];
					
                    console.log(optionItem);

                    if (optionItem['price']){
                        price += parseFloat(optionItem['price']);
                    }
                });

            });


            var priceElement = document.getElementById('smartcustomizer-price');

            if (!priceContainer || !priceElement){
                return;
            }

            if (price > 0){
                priceElement.innerHTML = Smartcustomizer.parsePrice(price);
            }

			priceContainer.classList.toggle('hide', price === 0);
            
          
            /*
        
        
            Smartcustomizer.selectedProductOptions = '';
        
            groups.forEach(function(group) {
                var groupId = group.getAttribute('data-id');
                Smartcustomizer.selectedProductOptions += groupId;
        
                var selectedOptions = group.querySelectorAll('input:checked, select');
                selectedOptions.forEach(function(option) {
                    Smartcustomizer.selectedProductOptions += '-' + option.value;
                });
        
                Smartcustomizer.selectedProductOptions += '~';
        
            });
        
            Smartcustomizer.selectedProductOptions = Smartcustomizer.selectedProductOptions.slice(0, -1);
        
            */

        }


        function changeProductOption(event) {
            var option = event.target;
            var groupId = option.getAttribute('data-gid');


            var group = optionsContainer.querySelector('fieldset[data-id="' + groupId + '"]');

            var rule = group.getAttribute('data-rule');
            var style = group.getAttribute('data-style');
            var type =  group.getAttribute('data-type');


            var checkedOptions = group.querySelectorAll('input:checked');

            console.log(checkedOptions.length);

            if (style !== '8' && !option.checked && checkedOptions.length === 0 && (rule === '1' || type === 'opt_type_print')){
                option.checked = true;
            }

            if (style !== '8' && rule === '1') {

                var groupOptions = group.querySelectorAll('input:not(#' + option.getAttribute('id') + ')');

                if (groupOptions.length > 0) {
                    groupOptions.forEach(function (option) {
                        option.checked = false;
                    });
                }


            }

            updateSelectedOptions();

        }

        productOptions.forEach(function (option) {
            option.addEventListener('change', changeProductOption, false);
        });


    },

    renderAppElements: function () {

        this.renderStyleLinks();
        
        this.scWrapper = document.createElement("div");
        this.scWrapper.id = this.appName + '-wrapper';
        this.scWrapper.classList.add(this.appName + '-wrapper');


        this.ssid = Smartcustomizer.getCookie('ssid');

        if (!this.ssid) {
            this.ssid = Smartcustomizer.generateHash();
            Smartcustomizer.setCookie('ssid', this.ssid);
        }


		this.scWrapper.innerHTML = '<div id="' + this.appName + '-app-loader" class="loader hide"><div class="' + this.appName + '-spinner"><div class="' + this.appName + '-bounce1"></div><div class="' + this.appName + '-bounce2"></div><div class="' + this.appName + '-bounce3"></div></div></div><img id="' + this.appName + '-loader-screen" src=""><iframe id="' + this.appName + '-iframe" data-src="' + this.baseUri + '" scrolling="no"   ></iframe><div class="progress-line"></div>';


        document.body.appendChild(this.scWrapper);

        this.scLoaderScreen = document.getElementById(this.appName + '-loader-screen');
        this.scAppLoader = document.getElementById(this.appName + '-app-loader');

        this.scIfrm = document.getElementById(this.appName + "-iframe");
        this.scIfrm.addEventListener("load", this.loadSC);
    },

    initMessageListener: function () {

        window.addEventListener('message', function (event) {

            if (event.origin + '/' !== this.baseUri) {
                //  return false;
            }

            var data = event.data;

            switch (data.action) {
                case 'close_sc':
                    Smartcustomizer.closeSC();
                    break;
                case 'hide_app':
                    Smartcustomizer.hideApp(data.screenUrl);
                    break;
                case 'show_app':
                    Smartcustomizer.showApp();
                    break;
                case 'add_to_cart':
                    if (data.sa && data.sa === 'order'){
						Smartcustomizer.closeSC();
					}
                    break;
                case 'reload':
                    Smartcustomizer.reload();
                    break;
                case 'redirect':
                    Smartcustomizer.redirect(data.link);
                    break;
                case 'send_ajax_request':
                    Smartcustomizer.sendAjaxRequest(data.afterAction, data.uri, data.data, data.type, data.headers, data.params, event.source, event.origin);
                    break;
                case 'set_cookie':
                    Smartcustomizer.setCookie(data.name, data.value, data.days);
                    break;
                case 'get_cookie':
                    Smartcustomizer.getCookieIframe(data.name, event.origin);
                    break;
                default:
            }

        }, false);

    },


    getUriParams: function (param) {

        var urlParams = {};

        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);

        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        return (param) ? ((urlParams[param]) ? urlParams[param] : null) : urlParams;

    },

    openSC: function (scLink) {

        var addUriParams = ',' + this.resolveField.field + '.' + this.resolveField.value + ',p.' + Smartcustomizer.uniqueId() + ',init.1';

        if (this.ssid) {
            addUriParams += ',ssid.' + this.ssid;
        }

        if (this.params) {
            addUriParams += ',' + this.params;
        }


      //  console.log(Smartcustomizer.selectedProductOptions);

        
        var selectedProductOptions = JSON.stringify(Smartcustomizer.selectedProductOptions);
		
		console.log(selectedProductOptions);
		
        selectedProductOptions = btoa(selectedProductOptions)
       // selectedProductOptions = encodeURIComponent(selectedProductOptions);
        addUriParams += ',opts.' + selectedProductOptions;

        /*
        var order_id = this.getUriParams('order_id');

        if (order_id) {
            addUriParams += ',order_id.' + order_id;
        }
        */

        var action = scLink.getAttribute('data-action');
        if (action === 'upload') {
            action = null;
            addUriParams = 'designs/' + addUriParams;
        }
        if (action) {
            addUriParams += ',action.' + action;
        }
        var params = scLink.getAttribute('data-params');
        if (params) {
            addUriParams += ',' + params;
        }
        Smartcustomizer.scready = true;


        //addUriParams 

        // Convert JSON data to a URL-encoded string
        // var jsonString = encodeURIComponent(JSON.stringify(jsonData));


        this.scIfrm.src = this.scIfrm.getAttribute('data-src') + addUriParams;

        if (Smartcustomizer.scready) {
            this.scAppLoader.classList.remove("hide");
        }

    },

    closeSC: function () {
        setTimeout(function () {
            Smartcustomizer.scWrapper.classList.remove("active");
        }, 0);
    },


    hideApp: function (screenUrl) {
        this.scLoaderScreen.setAttribute('src', screenUrl);
        //document.getElementById('smartcustomizer-iframe').classList.add('hide');
        this.scWrapper.classList.add('loading');
    },

    showApp: function () {
        this.scWrapper.classList.remove('loading');
    },

    reload: function () {
        location.reload(true);
    },
    redirect: function (link) {
        window.location = link;
    },
    loadSC: function () {

        if (Smartcustomizer.scready) {
            Smartcustomizer.scWrapper.classList.add('active');
        }
        Smartcustomizer.scAppLoader.classList.add("hide");

    },


    sendAjaxRequest: function (afterAction, uri, data, type, headers, params, source, origin) {
        headers = headers || {};
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        var async = false;

        if (params) {
            if (params.async) {
                async = true;
            }
        }

        xhr.open(type || 'GET', uri, async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {

                var contentType = xhr.getResponseHeader("Content-Type");

                var responseData = (contentType == 'application/json') ? JSON.parse(xhr.responseText) : xhr.responseText;

                if (data && data.render_image_only != undefined) {
                    responseData.render_image_only = data.render_image_only;
                }

                if (afterAction) {
                    Smartcustomizer.scIfrm.contentWindow.postMessage({ data: responseData, action: 'process_ajax_response', afterAction: afterAction }, origin);
                }
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        if (headers) {

            Object.keys(headers).forEach(function (header) {
                xhr.setRequestHeader(header, headers[header]);
            });

        }

        //xhr.withCredentials = true;


        var sendData = null;
        if (data) {
            // sendData = JSON.stringify(data);
            // sendData = window.btoa(unescape(encodeURIComponent(sendData)));
            var sendData = typeof data == 'string' ? data : Object.keys(data).map(
                function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
            ).join('&');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhr.send(sendData);
    },


    uniqueId: function () {
        return Math.floor(Date.now() / 1000);
    },
    addToCart: function (data) {

        alert('add to cart');

    },


    escapeHtml: function (unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },



    getAjax: function (url, success) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        //xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        return xhr;
    },

    setCookie: function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 3600000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires + "; SameSite=None; Secure; path=/";
    },

    getCookie: function (name) {
        var nameEQ = name + "=";
        var parts = document.cookie.split(';');
        var l = parts.length;
        for (var i = 0; i < l; i++) {
            var part = parts[i];
            while (part.charAt(0) == ' ') {
                part = part.substring(1, part.length);
            }
            if (part.indexOf(nameEQ) == 0) {
                return unescape(part.substring(nameEQ.length, part.length));
            }
        }
        return null;
    },

    removeCookie: function (name) {
        setCookie(name, "", -1);
    },

    getCookieIframe: function (name, origin) {
        Smartcustomizer.scIfrm.contentWindow.postMessage({ name, value: this.getCookie(name), action: 'process_get_cookie' }, origin);
    },


    generateHash: function (length) {
        length = length || 40;
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },


    parsePrice: function (inputPrice) {
        if (typeof inputPrice !== 'number') {
            throw new Error('Input price must be a number');
        }
        const decimalMatch = this.priceFormat.match(/\[(0+)(?:\.(0+))?\]/);
        if (!decimalMatch) {
            throw new Error('Invalid price format');
        }

        const integerPartLength = decimalMatch[1].length;
        const decimalPlaces = decimalMatch[2] ? decimalMatch[2].length : 0;
        const formattedPrice = inputPrice.toFixed(decimalPlaces);
        const formattedString = this.priceFormat.replace(/\[(0+)(?:\.(0+))?\]/, formattedPrice);

        return formattedString;

    }

};

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('smartcustomizer-options') && !document.getElementById('smartcustomizer-wrapper')) {
        Smartcustomizer = new Smartcustomizer();
        Smartcustomizer.initApp();
        Smartcustomizer.renderProductElements();
        Smartcustomizer.renderProductOptions();
    }

});
</script>