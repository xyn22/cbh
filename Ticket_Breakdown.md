# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### 1. Modify schema to support the ability to toggle custom ids on/off
- Add a new column `useCustomAgentId` to the `Facilities` table of type `BOOLEAN`. Column is `NOT NULL` and has `DEFAULT` set to `false`.
- Add a new column `customId` to the `Agents` table of type `VARCHAR(20)`, which allows `NULL` values.
- #### Story Points: 1
- #### Acceptance criteria:
>1. `Facilities` table to has all rows with `useCustomAgentId` set to FALSE
>2. `Agents` table has all  rows with `customId` set to NULL.


### 2. Modify `getFacilityById` to return `useCustomAgentId`
- Modify the `Facility` interface and add `useCustomAgentId` as `Boolean`
- Add `useCustomAgentId` to the list of fields in the `SELECT` statement. The returned object from this function must have `useCustomAgentId` set to `TRUE` if the field is `TRUE`, `FALSE` otherwise.
- #### Story Points: 3
- #### Acceptance criteria:
> 1. Make sure the build command succeeds to ensure getFacilityById returns the right object signature.


### 3. Modify `getShiftsByFacility` to return customId if applicable
- Currently `getShiftsByFacility` gets facility data by calling `getFacilityById` to ensure the `id` arg is valid Faciliy ID.
- When constructing the SQL statement string in `getShiftsByFacility`, add a check if `useCustomAgentId` is true and then add `Agent`.`customId` to the list of fields in the JOIN statement. For example
`SELECT Shifts.*, Agents.id AS agentSystemId, Agents.customId AS agentCustomId, Users.fullName FROM Shifts INNER JOIN Agents ON SHIFT.Facility = %facilityId AND SHIFT.AgentID = Agent.ID INNER JOIN Users ON Users.id = Agents.id ORDER BY Shifts.startDate ASC`. Do not `Agents.customId` if `useCustomAgentId` is false.
- Currently the list returned is Shift[]. For each `Shift` returned the `id: string` field must be set to `agentCustomId` from the query result if both `useCustomAgentId` and is true *AND* agentSystemId is not null. Otherwise it must be set to `agentSystemId` from query result.
- #### Story Points: 3
- #### Acceptance criteria:
> 1. `generateReport` should not care about that implementation details and it only operates on the `agentId` from the `Agent` interface.
> 2. For all facilities it should default to system id, unless customId is true and the agent has customId.
