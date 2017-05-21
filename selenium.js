// var webdriver = require('selenium-webdriver');
// var chrome = require('selenium-webdriver/chrome');
// var path = require('chromedriver').path;
// console.log(path)
// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);
//
// var driver = new webdriver.Builder()
//     .withCapabilities(webdriver.Capabilities.chrome())
//     .build();
//
// driver.get('http://google.ca');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
        chrome = require('selenium-webdriver/chrome'),
        firefox = require('selenium-webdriver/firefox');
var chrome_path = require('chromedriver').path;
var firefox_path = '/usr/local/bin/geckodriver';
var chrome_service = new chrome.ServiceBuilder(chrome_path).build();
var firefox_service = new firefox.ServiceBuilder(firefox_path).build();

// var capabilities = Capabilities.firefox();
// capabilities.set('marionette', true);
//
// var driver = new webdriver.Builder().withCapabilities(capabilities).build();

// var driver = new webdriver.Builder()
//     .withCapabilities(webdriver.Capabilities.firefox())
//     .build();

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
