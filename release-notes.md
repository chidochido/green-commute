# Release Notes

This document contains release notes for version 1.0.0 of Green Commute. It is the version being
submitted for the project.

## Software Features

This release of Green Commute is complete with the following features:

- API deployed on GCP at https://project1cs3300.ue.r.appspot.com/
- Frontend deployed via Github Pages at https://tkhv.github.io/
- Signup/Login system with users stored in GCP FireBase
- Spaces to input the origin and desitination that will be displayed on the map and used for
  footprint calculations
- Dropdown for configuring transportation method
- An interactive map
- Description of carbon impact of travel choices

## Bug Fixes

There aren't bug fixes from prior major versions since this is the first. That said, these are major
bug fixes that were fixed during development:

- Added CORS support to allow API calls from frontend
- Moved Gson dependency within pom.xml to fix build errors
- Added dropdown transport support
- Fix path in FBInitialize to ensure proper deployment of FireBase DB

## Known Bugs and Defects

At this point, the following bugs are present:

- Did not use BCrypt for password protection
- Proper status codes are not returned in all error cases
- User checking is only based on name and not also email
- We don't have make/model/year specific emissions data

## Help

Please see the README and/or install guide for help with building, running, and troubleshooting
Green Commute.
