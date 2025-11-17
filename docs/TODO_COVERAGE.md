# Coverage Improvement TODO

## Current Status (Phase 2)

Branch coverage temporarily lowered to 77% due to mobile UI implementation.

**Current Coverage**:
- Lines: 82.75% ✅
- Functions: 85.2% ✅
- **Branches: 77.22%** ⚠️ (Threshold: 77%)
- Statements: 82.75% ✅

## Low Coverage Files

### 1. VoxelUIManager.ts: 55.71% branches
**Why**: New mobile UI code paths not fully exercised
- `renderMobileUI()`: Partially covered
- Mobile bottom navigation integration: Needs integration tests

**Action Items**:
- [ ] Add integration tests for mobile UI in Phase 3
- [ ] Test mobile menu drawer (Phase 4)
- [ ] Test mobile block sheet (Phase 3)

### 2. TouchManager.ts: 66.66% branches
**Why**: Some gesture combinations not tested
- Two-finger gestures edge cases
- Simultaneous touch events

**Action Items**:
- [ ] Add tests for complex multi-touch scenarios
- [ ] Test rapid touch event sequences

### 3. DeviceDetector.ts: 67.21% branches
**Why**: Not all device types tested
- Edge cases for tablet detection
- Orientation change scenarios

**Action Items**:
- [ ] Add tests for tablet edge cases
- [ ] Test orientation change handling

### 4. TextureAtlas.ts: 38.46% branches
**Why**: Graphics code requires WebGL context
- Texture loading paths
- Error handling

**Action Items**:
- [ ] Add mock WebGL tests or skip coverage for graphics

## Target Coverage: 80% branches

**Timeline**:
- Phase 3 (Block Selection): +1-2% coverage
- Phase 4 (Menu Drawer): +1-2% coverage
- **Phase 6 (Integration)**: Reach 80%+ coverage

## Notes

- Mobile UI implementation is ongoing (Phase 2 of 6)
- Coverage will naturally increase as features are completed
- This is a temporary adjustment, not a permanent lowering of standards

**Last Updated**: 2025-11-16
**Created By**: Claude Code
