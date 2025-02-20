*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${BROWSER}    Chrome
${URL}        http://localhost:3000/sudoku

*** Keywords ***
Open Browser To Sudoku Game
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Page Contains Element    css=.board    10s

Get Timer Value
    ${timer}=    Get Text    css=.timer
    RETURN    ${timer}

Click Cell    [Arguments]    ${row}    ${col}
    ${row_index}=    Evaluate    ${row} + 1
    ${col_index}=    Evaluate    ${col} + 1
    Click Element    xpath=(//div[@class='row'])[${row_index}]/input[${col_index}]

Get Cell Value    [Arguments]    ${row}    ${col}
    ${row_index}=    Evaluate    ${row} + 1
    ${col_index}=    Evaluate    ${col} + 1
    ${value}=    Get Value    xpath=(//div[@class='row'])[${row_index}]/input[${col_index}]
    RETURN    ${value}




*** Test Cases ***
Open Game
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Page Contains Element    css=.board    10s

Verify Initial Game State
    [Documentation]    Test that game loads with correct initial state
    Page Should Contain Element    css=.board
    Page Should Contain Button    Restart
    Page Should Contain    Time: 0:00

Test Valid Number Input
    [Documentation]    Test number input and validation
    Click Cell    0    2
    Press Keys    None    5
    ${cell_value}=    Get Cell Value    0    2
    Should Be Equal    ${cell_value}    5
    # Cleanup
    Click Cell    0    2
    Press Keys    None    DELETE

Test Invalid Input Prevention
    [Documentation]    Test non-numeric inputs are blocked
    Click Cell    0    1
    Press Keys    None    A
    ${cell_value}=    Get Cell Value    0    1
    Should Be Equal    ${cell_value}    ${EMPTY}

Test Pause Functionality
    [Documentation]    Test pause/resume functionality
    ${initial_time}=    Get Timer Value
    Click Button    Pause
    Sleep    2s
    ${paused_time}=    Get Timer Value
    Should Be Equal    ${initial_time}    ${paused_time}
    Page Should Contain Element    css=.pause-overlay
    Click Button    Resume

Test Restart Functionality
    [Documentation]    Test game reset functionality
    Click Cell    0    2
    Press Keys    None    5
    Click Button    Restart
    Handle Alert    action=ACCEPT
    Sleep    1s
    ${cell_value}=    Get Cell Value    0    2
    Should Be Equal    ${cell_value}    ${EMPTY}
    ${timer}=    Get Timer Value
    Should Be Equal    ${timer}    Time: 0:01