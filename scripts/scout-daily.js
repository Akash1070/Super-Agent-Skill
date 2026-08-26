#!/usr/bin/env node

import { runAutonomousScout } from "../modules/cron_auto_scout.js";

console.log("🚀 Executing Daily GitHub Scout Scan...");
runAutonomousScout()
  .then(() => {
    console.log("✅ Daily GitHub Scout Scan Completed Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Daily GitHub Scout Scan Failed:", err);
    process.exit(1);
  });
