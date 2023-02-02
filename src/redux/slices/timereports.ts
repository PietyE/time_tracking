import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addWorkItem,
  getWorkItems,
  updateWorkItem,
  deleteWorkItem,
} from '../asyncActions/timereports';
import type { DeveloperProject } from 'api/models/developerProjects';
import type { User } from 'api/models/users';
import type { WorkItem, WorkItemsResponse } from 'api/models/workItems';

interface InitialState {
  isLoading: boolean;
  totalHours: number | null;
  workItems: WorkItem[];
  selectedProject: DeveloperProject;
  selectedDeveloper: Omit<User, 'permissions'>;
  isEditingWorkItem: boolean;
}

const initialState: InitialState = {
  isLoading: true,
  totalHours: null,
  workItems: [],
  selectedProject: {} as DeveloperProject,
  selectedDeveloper: {} as Omit<User, 'permissions'>,
  isEditingWorkItem: false,
};

const timereports = createSlice({
  name: 'timereports',
  initialState,
  reducers: {
    selectDeveloper: (
      state,
      action: PayloadAction<Omit<User, 'permissions'>>,
    ) => {
      state.selectedDeveloper = action.payload;
    },
    selectProject: (state, action: PayloadAction<DeveloperProject>) => {
      state.selectedProject = action.payload;
    },
    toggleEdit: (state) => {
      state.isEditingWorkItem = !state.isEditingWorkItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getWorkItems.fulfilled,
      (state, action: PayloadAction<WorkItemsResponse>) => {
        state.isLoading = false;
        state.workItems = action.payload.items;
      },
    );
    builder.addCase(getWorkItems.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.push(action.payload);
      },
    );
    builder.addCase(addWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.map((workItem) =>
          workItem.id !== action.payload.id ? workItem : action.payload,
        );
      },
    );
    builder.addCase(updateWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteWorkItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteWorkItem.fulfilled,
      (state, action: PayloadAction<WorkItem>) => {
        state.isLoading = false;
        state.workItems.splice(
          state.workItems.findIndex(
            (workItem) => workItem.id === action.payload.id,
          ),
          1,
        );
      },
    );
    builder.addCase(deleteWorkItem.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { selectDeveloper, selectProject, toggleEdit } =
  timereports.actions;

export default timereports.reducer;
