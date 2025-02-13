*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${BROWSER}    Chrome
${URL}        http://localhost:3000/connections

*** Test Cases ***
Open Game
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Title Should Be    Patrik's Homepage

Select Correct Words
    Click Element    xpath=//button[text()="Gold"]
    Click Element    xpath=//button[text()="Mango"]
    Click Element    xpath=//button[text()="Citrine"]
    Click Element    xpath=//button[text()="Saffron"]
    Click Element    xpath=//button[text()="Check"]
    Sleep    1s
    Page Should Contain    Shades of yellow
    ${color}    Get Element Attribute    xpath=//button[text()="Gold"]    style
    Should Contain    ${color}    background-color: orange

Check Mistake Counter Increase
    Click Element    xpath=//button[text()="Screen"]
    Click Element    xpath=//button[text()="Ruby"]
    Click Element    xpath=//button[text()="Back"]
    Click Element    xpath=//button[text()="Dress"]
    Click Element    xpath=//button[text()="Check"]
    Sleep    1s
    Page Should Contain    Mistakes: 1

Check Shake Animation
    Click Element    xpath=//button[text()="Screen"]
    Click Element    xpath=//button[text()="Ruby"]
    Click Element    xpath=//button[text()="Back"]
    Click Element    xpath=//button[text()="Dress"]
    Click Element    xpath=//button[text()="Check"]
    Click Element    xpath=//button[text()="Screen"]
    Click Element    xpath=//button[text()="Ruby"]
    Click Element    xpath=//button[text()="Back"]
    Click Element    xpath=//button[text()="Dress"]
    Click Element    xpath=//button[text()="Check"]
    Sleep    1s
    ${class}    Get Element Attribute    xpath=//div[contains(@class, 'grid')]    class
    Should Contain    ${class}    shake 
    

Verify Almost Correct Hint
    Click Element    xpath=//button[text()="Screen"]
    Click Element    xpath=//button[text()="Ruby"]
    Click Element    xpath=//button[text()="Back"]
    Click Element    xpath=//button[text()="Dress"]
    Click Element    xpath=//button[text()="Check"]
    Click Element    xpath=//button[text()="Ruby"]
    Click Element    xpath=//button[text()="Python"]
    Click Element    xpath=//button[text()="Go"]
    Click Element    xpath=//button[text()="Smart"]
    Click Element    xpath=//button[text()="Check"]
    Sleep    1s
    Page Should Contain    You're one word away!


Check Game Over 
    Click Element    xpath=//button[text()="Check"]
    Sleep    1s
    Page Should Contain    You're one word away!
    ${disabled}    Get Element Attribute    xpath=//button[text()="Check"]    disabled
    Should Be Equal As Strings    ${disabled}    true
    Page Should Contain    Game Over

Check Final Board
    # Check that at least one word from each category has a color
    ${Shades of yellow}    Get Element Attribute    xpath=//button[text()="Gold"]    style
    ${Programming languages}    Get Element Attribute    xpath=//button[text()="Ruby"]    style
    ${Types of watches}    Get Element Attribute    xpath=//button[text()="Dress"]    style
    ${Words that start with Touch}    Get Element Attribute    xpath=//button[text()="Back"]    style

    Should Contain    ${Shades of yellow}    background-color
    Should Contain    ${Programming languages}    background-color
    Should Contain    ${Types of watches}    background-color
    Should Contain    ${Words that start with Touch}    background-color