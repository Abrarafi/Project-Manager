

## Revised Role Definitions
1. **Project Manager**
   - Full control over board creation and configuration
   - Can manage team members and permissions
   - Can perform all card operations
   - Access to all administrative functions

2. **Team Member**
   - Can view and interact with assigned boards
   - Limited to card operations within their permissions
   - Cannot modify board structure or settings

## Updated Functional Requirements

### Board Management
- FR1: The system shall allow Project Managers to create multiple Kanban boards
- FR2: Project Managers shall be able to customize columns (default: To Do, In Progress, Done)
- FR3: Only Project Managers shall be able to rename, add, delete, and reorder columns
- FR17: Project Managers shall be able to invite/remove Team Members from boards

### Card Management
- FR4: Both roles shall be able to create task cards within columns
- FR5: Each card shall have title, description, due date, priority, and assignee fields
- FR6: Both roles shall be able to drag-and-drop cards between columns (within their permissions)
- FR7: Both roles shall be able to edit card details (Team Members only for assigned cards)
- FR8: Project Managers can delete any cards; Team Members can only delete their own cards
- FR9: Cards shall display visual indicators for priority and due date status

### Permissions
- FR18: Project Managers shall have full control over all board functions
- FR19: Team Members shall only modify cards assigned to them unless given additional permissions
- FR20: System shall prevent Team Members from modifying board structure or settings

## Updated User Stories

### Project Manager Stories
1. As a Project Manager, I want to create and configure **boards** so that I can set up workflows for my team.
2. As a Project Manager, I want to manage team member access so that only authorized people can view/edit boards.
3. As a Project Manager, I want to reorganize **columns** so that I can adapt the workflow as projects evolve.
4. As a Project Manager, I want to assign tasks to team members so that work is properly distributed.
5. As a Project Manager, I want to delete or archive old cards so that the board remains current.

### Team Member Stories
6. As a Team Member, I want to view my assigned boards so that I can see my tasks.
7. As a Team Member, I want to update the status of my tasks so that progress is visible to the team.
8. As a Team Member, I want to edit details of my assigned cards so that I can keep information current.
9. As a Team Member, I want to see when tasks are due so that I can prioritize my work.
10. As a Team Member, I want to add comments to cards so that I can communicate with my team.

### Shared Stories
11. As a user, I want to receive notifications when assigned to a **card** so that I don't miss new tasks.
12. As a user, I want to search for specific cards so that I can quickly find relevant tasks.
13. As a user, I want to see card history so that I can track changes over time.-**Activity**.

## Permission Matrix

| Feature                | Project Manager | Team Member |
|------------------------|-----------------|-------------|
| Create boards          | Yes             | No          |
| Modify board structure | Yes             | No          |
| Invite team members    | Yes             | No          |
| Create cards           | Yes             | Yes         |
| Edit any card          | Yes             | No          |
| Edit assigned cards    | N/A             | Yes         |
| Move any cards         | Yes             | No          |
| Move assigned cards    | N/A             | Yes         |
| Delete any cards       | Yes             | No          |
| Delete own cards       | N/A             | Yes         |
| Add comments           | Yes             | Yes         |
| View all cards         | Yes             | Yes         |