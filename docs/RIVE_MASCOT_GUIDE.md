# JP Forus Mascot Rive Guide

## Asset

Use this SVG as the source file for Rive:

```txt
public/mascots/jp-forus-mascot-rive-ready.svg
```

The React app already has a lightweight animated SVG version in:

```txt
src/components/mascot/JapaneseMascot.tsx
src/components/mascot/mascot.css
```

## Import To Rive

1. Open Rive and create a new file.
2. Drag `jp-forus-mascot-rive-ready.svg` into the canvas.
3. Check that these groups are visible in the hierarchy:
   - `Mascot`
   - `Back_Ribbon`
   - `Body`
   - `Head`
   - `Left_Hand`
   - `Right_Hand`
   - `Learning_Card`
   - `Eyes_Open`
   - `Eyes_Happy`
   - `Eyes_Closed`
   - `Success_Sparkles`

## Recommended Origins

Set origins before animating:

- `Mascot`: center of the body.
- `Head`: lower center of the face.
- `Left_Hand`: center of the left palm.
- `Right_Hand`: center of the right palm.
- `Learning_Card`: center of the card.
- `Back_Ribbon`: center of the body.

## Animations

Create these timelines:

- `idle`: small vertical float on `Mascot`, subtle ribbon rotation.
- `email`: rotate `Right_Hand` toward the form and wiggle `Learning_Card`.
- `password`: move both hands upward to cover the eyes, hide `Eyes_Open`, show `Eyes_Closed`.
- `error`: short horizontal shake on `Mascot`, show `Mouth_Error`.
- `success`: bounce `Mascot`, show `Eyes_Happy`, show `Success_Sparkles`.

## State Machine

Create a state machine named:

```txt
MascotMachine
```

Recommended inputs:

- `mode`: number
  - `0` idle
  - `1` email
  - `2` password
  - `3` error
  - `4` success
- `tap`: trigger
- `hover`: boolean

## Web Runtime

After exporting `jp-forus-mascot.riv`, put it here:

```txt
public/rive/jp-forus-mascot.riv
```

Then install:

```bash
npm install @rive-app/react-canvas
```

Basic component:

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export function RiveMascot() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/jp-forus-mascot.riv',
    stateMachines: 'MascotMachine',
    autoplay: true,
  });

  const modeInput = useStateMachineInput(rive, 'MascotMachine', 'mode');
  const tapInput = useStateMachineInput(rive, 'MascotMachine', 'tap');

  return (
    <button
      className="h-28 w-28 cursor-pointer"
      onMouseEnter={() => {
        if (modeInput) modeInput.value = 4;
      }}
      onMouseLeave={() => {
        if (modeInput) modeInput.value = 0;
      }}
      onClick={() => tapInput?.fire()}
      aria-label="JP Forus mascot"
    >
      <RiveComponent />
    </button>
  );
}
```

## Performance Notes

- Animate only transform and opacity.
- Avoid animated blur and large shadows inside Rive.
- Keep path count low.
- Use `prefers-reduced-motion` in the React fallback if needed.
