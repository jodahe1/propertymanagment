import { Module } from '@nestjs/common';
// In-memory implementation can be added here for testing purposes
// This module would provide in-memory implementations of repositories

@Module({
  providers: [
    // Add in-memory repository implementations here
  ],
  exports: [
    // Export in-memory repository implementations here
  ],
})
export class InMemoryPersistenceModule {}
