<img align="right" alt="Demo of task-management app" src="https://raw.githubusercontent.com/mrpmohiburrahman/task-management/master/assets/images/task-management-app-demo.gif" width="200"/>

# Task Management App

### An app for organizing tasks for your team, just like Trello

<br/>

- [About](#about)
- [Used technology](#used-technology)
- [How to use](#how-to-use)
- [Screen Shots](#screen-shots)

<br/>
<br/>

## About

This app is made with react native, supabase as a serverless backend and clerk for authentication

## Used technology

<table style="width:600px">
  <thead align="center">
   <tr border: none;>
     <th>Front End</th>
     <th>Back End</th>
     <th>Data Base</th>
   </tr>
  </thead>
  <tr>
    <td>React Native</td>
    <td>Supabase</td>
    <td>Postgres</td>
  </tr>
  <tr>
    <td>Typescript</td>
    <td>Clerk</td>
    <td>&nbsp</td>
  </tr>
  <tr>
    <td>&nbsp</td>
    <td>&nbsp</td>
    <td>&nbsp</td>
  </tr>
</table> 
<br/>
<br/>

## How To Use

To run this application, you'll need the following things installed in your computer:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/)

You need to run both have [Supabase](https://supabase.com/) project setup and [Clerk](https://clerk.com/).

From Supabase and Clerk you need to fill up the following variables in the ".env" file. please, taka a look at example.env, rename it to ".env" and fill up the variables

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

From your command line:

```bash

# Clone this repository
$ git clone git@github.com:mrpmohiburrahman/task-management.git

# Go into the repository
$ cd task-management

# Install dependencies
$ npm install

# Run the app
$ yarn start
```

## Video Demo

https://github.com/user-attachments/assets/688b2efa-5960-4e8e-a9af-1ce35423c418
