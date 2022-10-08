[![Node.js CI](https://github.com/Nanane/test-agenda/actions/workflows/node.js.yml/badge.svg)](https://github.com/Nanane/test-agenda/actions/workflows/node.js.yml)

Features
The needed features should be:
- a daily view of the agenda with appointments of the current day
- capacity to create an appointment associating a vendor and a buyer. The typical duration is 15 min but it could be a multiplier of this like 30, 60, 120 min.
- delete an appointment 

The bonus features are:
- Moving through days (previous, next, date picker)
- Capacity to easily move an appointment to another timeslot


TODO
- ~~create "day" page~~
    - empty page with the hours shown on a row
    - (maybe work with table and rowspan ?)

- ~~create "api" endpoints (using localstorage for now)~~
    - add typing
    - events
    - persons (vendors + buyers)

- add an event
    - add modal + button
    - add form + submit
    - add form validation

- add display of current day events
    - use fetch endpoint

- delete an event
    - onRightCLick display menu with delete option

- navigate through days
    - add input date with current day
    - add buttons to update input + refetch data

- move events
    - on rightclick, add option to move event
    - display form with date and time input (the duration should not change)
    - by default select next available slot where the event would fit
