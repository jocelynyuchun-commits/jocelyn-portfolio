'use client'

/**
 * UNTUCKit DLS 2026 — Foundations
 * Primitive tokens (Color · Typography · Scale · Border · Grid)
 * Semantic tokens (Color · Buttons · Typography · Spacing)
 */

import { useState } from 'react'

// ─── Variable types ────────────────────────────────────────────────────────────

type FigmaVariable = {
  name: string
  hex?: string
  number?: string
  text?: string
  ref?: string
  refHex?: string
  refValue?: string
  refText?: string
}

type FigmaGroup = {
  label: string
  vars: FigmaVariable[]
}

type SidebarItem = { label: string; count: number }

type FigmaCollection = {
  name: string
  collectionCount: number
  sidebarGroups: SidebarItem[]
  groupsByCategory: Record<string, FigmaGroup[]>
}

// ─── Primitives ────────────────────────────────────────────────────────────────

const PRIMITIVES: FigmaCollection = {
  name: 'Primitives',
  collectionCount: 95,
  sidebarGroups: [
    { label: 'Color',      count: 50 },
    { label: 'Typography', count: 30 },
    { label: 'Scale',      count: 15 },
  ],
  groupsByCategory: {
    Color: [
      {
        label: 'Color / Brand',
        vars: [
          { name: 'primary',   hex: '#2C4E7E' },
          { name: 'secondary', hex: '#2F71D4' },
          { name: 'Logo',      hex: '#8E2231' },
        ],
      },
      {
        label: 'Color / Blue-Brand 1',
        vars: [
          { name: 'Blue-100', hex: '#E4EAF4' },
          { name: 'Blue-200', hex: '#BDC9DD' },
          { name: 'Blue-300', hex: '#90A5C3' },
          { name: 'Blue-400', hex: '#5A84BC' },
          { name: 'Blue-500', hex: '#2F71D4' },
          { name: 'Blue-600', hex: '#2A60B2' },
          { name: 'Blue-700', hex: '#255090' },
          { name: 'Blue-800', hex: '#1C3E70' },
          { name: 'Blue-900', hex: '#142D51' },
        ],
      },
      {
        label: 'Color / Neutral',
        vars: [
          { name: 'Grey-100', hex: '#FBFBFB' },
          { name: 'Grey-200', hex: '#EAEAEA' },
          { name: 'Grey-300', hex: '#C5C5C5' },
          { name: 'Grey-400', hex: '#9B9B9B' },
          { name: 'Grey-500', hex: '#7C7C7C' },
          { name: 'Grey-600', hex: '#686868' },
          { name: 'Grey-700', hex: '#4A4A4A' },
          { name: 'Grey-800', hex: '#333333' },
          { name: 'Grey-900', hex: '#181818' },
          { name: 'White',    hex: '#FFFFFF' },
        ],
      },
      {
        label: 'Color / Red',
        vars: [
          { name: 'Red-100', hex: '#FCE5E5' },
          { name: 'Red-200', hex: '#F5B5B5' },
          { name: 'Red-300', hex: '#ED8585' },
          { name: 'Red-400', hex: '#E55555' },
          { name: 'Red-500', hex: '#E27272' },
          { name: 'Red-600', hex: '#D43030' },
          { name: 'Red-700', hex: '#C02321' },
          { name: 'Red-800', hex: '#9C1C1B' },
          { name: 'Red-900', hex: '#821818' },
        ],
      },
      {
        label: 'Color / Green',
        vars: [
          { name: 'Green-100', hex: '#E0F4E5' },
          { name: 'Green-200', hex: '#B5E3C0' },
          { name: 'Green-300', hex: '#85CE99' },
          { name: 'Green-400', hex: '#5BBD75' },
          { name: 'Green-500', hex: '#5DCB77' },
          { name: 'Green-600', hex: '#3CAA52' },
          { name: 'Green-700', hex: '#2D9A40' },
          { name: 'Green-800', hex: '#1F7E36' },
          { name: 'Green-900', hex: '#14622B' },
        ],
      },
    ],
    Typography: [
      {
        label: 'Typography / Font-Family',
        vars: [
          { name: 'Header',    text: 'Proxima Nova' },
          { name: 'Body Text', text: 'Proxima Nova' },
        ],
      },
      {
        label: 'Typography / Font Size / Header',
        vars: [
          { name: 'H1', number: '24' },
          { name: 'H2', number: '20' },
          { name: 'H3', number: '18' },
          { name: 'H4', number: '16' },
          { name: 'H5', number: '14' },
        ],
      },
      {
        label: 'Typography / Font Size / BodyText',
        vars: [
          { name: 'XL', number: '20' },
          { name: 'L',  number: '18' },
          { name: 'M',  number: '16' },
          { name: 'S',  number: '14' },
          { name: 'XS', number: '12' },
        ],
      },
      {
        label: 'Typography / Font Weight',
        vars: [
          { name: 'Regular',  number: '400' },
          { name: 'Medium',   number: '500' },
          { name: 'Semibold', number: '600' },
        ],
      },
      {
        label: 'Typography / Line-Height / Header',
        vars: [
          { name: 'H1', number: '30' },
          { name: 'H2', number: '26' },
          { name: 'H3', number: '22' },
          { name: 'H4', number: '20' },
          { name: 'H5', number: '18' },
        ],
      },
      {
        label: 'Typography / Line-Height / Body',
        vars: [
          { name: 'XL', number: '28' },
          { name: 'L',  number: '24' },
          { name: 'M',  number: '22' },
          { name: 'S',  number: '20' },
          { name: 'XS', number: '16' },
        ],
      },
      {
        label: 'Typography / Letter-Spacing',
        vars: [
          { name: 'Header/Default', number: '0'    },
          { name: 'Body/Default',   number: '0.32' },
        ],
      },
      {
        label: 'Typography / Text-Case',
        vars: [
          { name: 'Title-Case/Default', text: 'Title Case' },
          { name: 'All-Caps/Default',   text: 'UPPERCASE'  },
          { name: 'None/Default',       text: 'None'       },
        ],
      },
    ],
    Scale: [
      {
        label: 'Scale',
        vars: [
          { name: 'Scale/100',  number: '4'   },
          { name: 'Scale/200',  number: '8'   },
          { name: 'Scale/300',  number: '12'  },
          { name: 'Scale/400',  number: '16'  },
          { name: 'Scale/500',  number: '20'  },
          { name: 'Scale/600',  number: '24'  },
          { name: 'Scale/700',  number: '28'  },
          { name: 'Scale/800',  number: '32'  },
          { name: 'Scale/900',  number: '40'  },
          { name: 'Scale/1000', number: '48'  },
          { name: 'Scale/1100', number: '64'  },
          { name: 'Scale/1200', number: '80'  },
          { name: 'Scale/1300', number: '96'  },
          { name: 'Scale/1400', number: '120' },
        ],
      },
    ],
  },
}

// ─── Semantic ──────────────────────────────────────────────────────────────────

const SEMANTIC: FigmaCollection = {
  name: 'Semantic',
  collectionCount: 180,
  sidebarGroups: [
    { label: 'Color',      count: 34 },
    { label: 'Buttons',    count: 29 },
    { label: 'Typography', count: 72 },
    { label: 'Spacing',    count: 45 },
  ],
  groupsByCategory: {
    Color: [
      {
        label: 'Color / Heading',
        vars: [
          { name: 'H1', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'H2', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'H3', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'H4', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'H5', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
        ],
      },
      {
        label: 'Color / Bodytext',
        vars: [
          { name: 'Default',   ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'Secondary', ref: 'Color/Neutral/Grey-700', refHex: '#4A4A4A' },
          { name: 'Muted',     ref: 'Color/Neutral/Grey-500', refHex: '#7C7C7C' },
          { name: 'Disabled',  ref: 'Color/Neutral/Grey-300', refHex: '#C5C5C5' },
          { name: 'Inverse',   ref: 'Color/Neutral/White',    refHex: '#FFFFFF' },
        ],
      },
      {
        label: 'Color / Error',
        vars: [
          { name: 'Default',    ref: 'Color/Red/Red-900', refHex: '#821818' },
          { name: 'Text',       ref: 'Color/Red/Red-900', refHex: '#821818' },
          { name: 'Background', ref: 'Color/Red/Red-500', refHex: '#E27272' },
          { name: 'Border',     ref: 'Color/Red/Red-700', refHex: '#C02321' },
        ],
      },
      {
        label: 'Color / Sale',
        vars: [
          { name: 'Default',    ref: 'Color/Red/Red-700', refHex: '#C02321' },
          { name: 'Text',       ref: 'Color/Red/Red-700', refHex: '#C02321' },
          { name: 'Background', ref: 'Color/Red/Red-500', refHex: '#E27272' },
          { name: 'Border',     ref: 'Color/Red/Red-600', refHex: '#D43030' },
        ],
      },
      {
        label: 'Color / Success',
        vars: [
          { name: 'Text',       ref: 'Color/Green/Green-900', refHex: '#14622B' },
          { name: 'Default',    ref: 'Color/Green/Green-900', refHex: '#14622B' },
          { name: 'Background', ref: 'Color/Green/Green-500', refHex: '#5DCB77' },
          { name: 'Border',     ref: 'Color/Green/Green-800', refHex: '#1F7E36' },
        ],
      },
      {
        label: 'Color / Surface',
        vars: [
          { name: 'Page',    ref: 'Color/Neutral/Grey-100', refHex: '#FBFBFB' },
          { name: 'Card',    ref: 'Color/Neutral/White',    refHex: '#FFFFFF' },
          { name: 'Overlay', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
          { name: 'Inverse', ref: 'Color/Neutral/Grey-900', refHex: '#181818' },
        ],
      },
      {
        label: 'Color / Border',
        vars: [
          { name: 'Default',  ref: 'Color/Neutral/Grey-200', refHex: '#EAEAEA' },
          { name: 'Strong',   ref: 'Color/Neutral/Grey-400', refHex: '#9B9B9B' },
          { name: 'Focus',    ref: 'Color/Brand/primary',    refHex: '#2C4E7E' },
          { name: 'Disabled', ref: 'Color/Neutral/Grey-100', refHex: '#FBFBFB' },
        ],
      },
      {
        label: 'Color / Text Link',
        vars: [
          { name: 'Default',  ref: 'Color/Blue-Brand 1/Blue-900', refHex: '#142D51' },
          { name: 'Hover',    ref: 'Color/Blue-Brand 1/Blue-700', refHex: '#255090' },
          { name: 'Focus',    ref: 'Color/Blue-Brand 1/Blue-600', refHex: '#2A60B2' },
          { name: 'Disabled', ref: 'Color/Neutral/Grey-200',      refHex: '#EAEAEA' },
        ],
      },
    ],
    Buttons: [
      {
        label: 'Buttons / Solid',
        vars: [
          { name: 'Default',        ref: 'Color/Blue-Brand 1/Blue-900', refHex: '#142D51' },
          { name: 'Hover',          ref: 'Color/Blue-Brand 1/Blue-700', refHex: '#255090' },
          { name: 'Active-Pressed', ref: 'Color/Blue-Brand 1/Blue-500', refHex: '#2F71D4' },
          { name: 'Focus-Fill',     ref: 'Color/Blue-Brand 1/Blue-100', refHex: '#E4EAF4' },
          { name: 'Focus-Ring',     ref: 'Color/Blue-Brand 1/Blue-300', refHex: '#90A5C3' },
          { name: 'Disabled',       ref: 'Color/Neutral/Grey-300',      refHex: '#C5C5C5' },
          { name: 'Text-Default',   ref: 'Color/Heading/White',         refHex: '#FFFFFF' },
          { name: 'Text-Disabled',  ref: 'Color/Heading/Grey-400',      refHex: '#9B9B9B' },
        ],
      },
      {
        label: 'Buttons / Outline',
        vars: [
          { name: 'Default',        ref: 'Color/Blue-Brand 1/Blue-900', refHex: '#142D51' },
          { name: 'Hover',          ref: 'Color/Blue-Brand 1/Blue-700', refHex: '#255090' },
          { name: 'Active-Pressed', ref: 'Color/Blue-Brand 1/Blue-500', refHex: '#2F71D4' },
          { name: 'Focus-Fill',     ref: 'Color/Blue-Brand 1/Blue-100', refHex: '#E4EAF4' },
          { name: 'Focus-Ring',     ref: 'Color/Blue-Brand 1/Blue-300', refHex: '#90A5C3' },
          { name: 'Disabled',       ref: 'Color/Neutral/Grey-300',      refHex: '#C5C5C5' },
          { name: 'Text-Default',   ref: 'Color/Blue-Brand 1/Blue-900', refHex: '#142D51' },
          { name: 'Text-Hover',     ref: 'Color/Blue-Brand 1/Blue-700', refHex: '#255090' },
          { name: 'Text-Active',    ref: 'Color/Blue-Brand 1/Blue-500', refHex: '#2F71D4' },
          { name: 'Text-Disabled',  ref: 'Color/Neutral/Grey-300',      refHex: '#C5C5C5' },
        ],
      },
      {
        label: 'Buttons / Width',
        vars: [
          { name: 'Small',  number: '144' },
          { name: 'Medium', number: '172' },
          { name: 'Large',  number: '366' },
        ],
      },
      {
        label: 'Buttons / Height',
        vars: [
          { name: 'Small',  number: '40' },
          { name: 'Medium', number: '48' },
          { name: 'Large',  number: '48' },
        ],
      },
      {
        label: 'Buttons / Radius',
        vars: [
          { name: 'Default', text: '4' },
        ],
      },
      {
        label: 'Buttons / Border Width',
        vars: [
          { name: 'Default', text: '1' },
        ],
      },
      {
        label: 'Buttons / Font Size',
        vars: [
          { name: 'Default', number: '16' },
        ],
      },
      {
        label: 'Buttons / Font Weight',
        vars: [
          { name: 'Default', text: '600' },
        ],
      },
      {
        label: 'Buttons / Font-Family',
        vars: [
          { name: 'Default', text: 'Proxima Nova' },
        ],
      },
    ],
    Typography: (() => {
      const headingStyle = (h: 'H1' | 'H2' | 'H3' | 'H4' | 'H5') => ({
        label: `Typography / Heading / ${h}`,
        vars: [
          { name: 'Font Family',    ref: 'Typography/Font-Family/Header',         refText: 'Proxima Nova' },
          { name: 'Font Size',      ref: `Typography/Font Size/Header/${h}`,      refValue: ({ H1: '24', H2: '20', H3: '18', H4: '16', H5: '14' } as const)[h] },
          { name: 'Font Weight',    ref: 'Typography/Font Weight/Semibold',       refValue: '600' },
          { name: 'Line-Height',    ref: `Typography/Line-Height/Header/${h}`,    refValue: ({ H1: '30', H2: '26', H3: '22', H4: '20', H5: '18' } as const)[h] },
          { name: 'Letter Spacing', ref: 'Typography/Letter-Spacing/Header/Default', refValue: '0' },
          { name: 'Text-Case',      ref: 'Typography/Text-Case/Title-Case/Default',  refText: 'Title Case' },
        ],
      })
      const bodyStyle = (s: 'XL' | 'L' | 'M' | 'S' | 'XS') => ({
        label: `Typography / BodyText / ${s}`,
        vars: [
          { name: 'Font Family',    ref: 'Typography/Font-Family/Body Text',      refText: 'Proxima Nova' },
          { name: 'Font Size',      ref: `Typography/Font Size/BodyText/${s}`,    refValue: ({ XL: '20', L: '18', M: '16', S: '14', XS: '12' } as const)[s] },
          { name: 'Font Weight',    ref: 'Typography/Font Weight/Regular',        refValue: '400' },
          { name: 'Line-Height',    ref: `Typography/Line-Height/Body/${s}`,      refValue: ({ XL: '28', L: '24', M: '22', S: '20', XS: '16' } as const)[s] },
          { name: 'Letter Spacing', ref: 'Typography/Letter-Spacing/Body/Default', refValue: '0.32' },
          { name: 'Text-Case',      ref: 'Typography/Text-Case/None/Default',     refText: 'None' },
        ],
      })
      const labelStyle = (s: 'M' | 'XS') => ({
        label: `Typography / Label / ${s}`,
        vars: [
          { name: 'Font Family',    ref: 'Typography/Font-Family/Body Text',         refText: 'Proxima Nova' },
          { name: 'Font Size',      ref: `Typography/Font Size/BodyText/${s}`,       refValue: ({ M: '16', XS: '12' } as const)[s] },
          { name: 'Font Weight',    ref: 'Typography/Font Weight/Semibold',          refValue: '600' },
          { name: 'Line-Height',    ref: 'Typography/Line-Height/Body/XS',           refValue: '16' },
          { name: 'Letter Spacing', ref: 'Typography/Letter-Spacing/Header/Default', refValue: '0' },
          { name: 'Text-Case',      ref: 'Typography/Text-Case/All-Caps/Default',    refText: 'UPPERCASE' },
        ],
      })
      return [
        headingStyle('H1'), headingStyle('H2'), headingStyle('H3'), headingStyle('H4'), headingStyle('H5'),
        bodyStyle('XL'),    bodyStyle('L'),     bodyStyle('M'),     bodyStyle('S'),     bodyStyle('XS'),
        labelStyle('M'),    labelStyle('XS'),
      ]
    })(),
    Spacing: (() => {
      const SCALE_VALUES: Record<string, string> = {
        '100': '4',  '200': '8',  '300': '12',  '400': '16', '500': '20',
        '600': '24', '700': '28', '800': '32',  '900': '40', '1000': '48',
        '1100': '64','1200': '80','1300': '96', '1400': '120',
      }
      const scaleRef = (n: string) => ({ ref: `Scale/${n}`, refValue: SCALE_VALUES[n] })
      const trio = (label: string, d: string, t: string, m: string) => ({
        label,
        vars: [
          { name: 'Desktop', ...scaleRef(d) },
          { name: 'Tablet',  ...scaleRef(t) },
          { name: 'Mobile',  ...scaleRef(m) },
        ],
      })
      return [
        trio('Spacing / Section / Padding / Padding-Y / XL', '1400', '1200', '1100'),
        trio('Spacing / Section / Padding / Padding-Y / L',  '1200', '1100', '1000'),
        trio('Spacing / Section / Padding / Padding-Y / M',  '1100', '1000', '900'),
        trio('Spacing / Section / Padding / Padding-Y / S',  '1000', '900',  '800'),
        {
          label: 'Spacing / Section / Padding / Padding-X',
          vars: [
            { name: 'Desktop', ref: 'Grid/Margin/Desktop/Default', refValue: '40' },
            { name: 'Tablet',  ref: 'Grid/Margin/Tablet/Default',  refValue: '24' },
            { name: 'Mobile',  ref: 'Grid/Margin/Mobile/Default',  refValue: '16' },
          ],
        },
        trio('Spacing / Page / Header-Height',     '1000', '900',  '900'),
        trio('Spacing / Page / Content-Gap',       '1100', '1000', '900'),
        trio('Spacing / Page / Footer-Padding-Y',  '1200', '1100', '1000'),
        trio('Spacing / Product Grid / Gap',       '600',  '400',  '400'),
        trio('Spacing / Product Grid / Item-Gap',  '300',  '200',  '200'),
        trio('Spacing / Stack / Gap / XL',         '800',  '600',  '600'),
        trio('Spacing / Stack / Gap / L',          '600',  '400',  '400'),
        trio('Spacing / Stack / Gap / M',          '400',  '300',  '300'),
        trio('Spacing / Stack / Gap / S',          '300',  '200',  '200'),
        trio('Spacing / Stack / Gap / XS',         '200',  '100',  '100'),
      ]
    })(),
  },
}

// ─── Display data (visual swatch grids) ────────────────────────────────────────

const BLUE_SCALE = [
  { shade: '100', hex: '#E4EAF4', semantic: 'Solid/Focus-Fill, Outline/Focus-Fill' },
  { shade: '200', hex: '#BDC9DD', semantic: 'Inverted Active' },
  { shade: '300', hex: '#90A5C3', semantic: 'Focus Ring' },
  { shade: '400', hex: '#5A84BC', semantic: '' },
  { shade: '500', hex: '#2F71D4', semantic: 'Active / Pressed' },
  { shade: '600', hex: '#2A60B2', semantic: '' },
  { shade: '700', hex: '#255090', semantic: 'Hover' },
  { shade: '800', hex: '#1C3E70', semantic: '' },
  { shade: '900', hex: '#142D51', semantic: 'Default (Navy)' },
]

const NEUTRAL_SCALE = [
  { shade: '100', hex: '#FBFBFB', semantic: '' },
  { shade: '200', hex: '#EAEAEA', semantic: '' },
  { shade: '300', hex: '#C5C5C5', semantic: 'Disabled BG / Border' },
  { shade: '400', hex: '#9B9B9B', semantic: 'Disabled Text' },
  { shade: '500', hex: '#7C7C7C', semantic: '' },
  { shade: '600', hex: '#686868', semantic: '' },
  { shade: '700', hex: '#4A4A4A', semantic: '' },
  { shade: '800', hex: '#333333', semantic: '' },
  { shade: '900', hex: '#181818', semantic: '' },
]

const BRAND_COLORS = [
  { name: 'Navy',    hex: '#142D51', token: 'Color/Navy' },
  { name: 'Maroon',  hex: '#8E2231', token: 'Color/Maroon' },
  { name: 'Success', hex: '#24882D', token: 'Color/Success' },
  { name: 'Error',   hex: '#C02321', token: 'Color/Error' },
]

const TYPE_SCALE = [
  { label: 'H1', size: '24px', lineH: '30px', weight: '600', example: 'Shop the Collection' },
  { label: 'H2', size: '20px', lineH: '26px', weight: '600', example: 'New Arrivals' },
  { label: 'H3', size: '18px', lineH: '22px', weight: '600', example: 'Featured Styles' },
  { label: 'H4', size: '16px', lineH: '20px', weight: '600', example: 'Product Details' },
  { label: 'H5', size: '14px', lineH: '18px', weight: '600', example: 'Size & Fit' },
]

const BODY_SCALE = [
  { label: 'Body XL', size: '20px', lineH: '28px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body L',  size: '18px', lineH: '24px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body M',  size: '16px', lineH: '22px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body S',  size: '14px', lineH: '20px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body XS', size: '12px', lineH: '16px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
]

const LABEL_SCALE = [
  { label: 'Label/L_600', size: '16px', lineH: '20px', weight: '600', ls: '0.02em', example: 'Add to Bag' },
  { label: 'Label/L_500', size: '16px', lineH: '20px', weight: '500', ls: '0.02em', example: 'Wrinkle-Free Short Sleeve Shirt' },
  { label: 'Label/L_400', size: '16px', lineH: '20px', weight: '400', ls: '0.02em', example: '$110' },
  { label: 'Label/M_500', size: '14px', lineH: '16px', weight: '500', ls: '0.02em', example: 'Sky Blue' },
  { label: 'Label/M_400', size: '14px', lineH: '16px', weight: '400', ls: '0.02em', example: 'Extra 30% Off With Code GIFT' },
  { label: 'Label/XS_600', size: '10px', lineH: '12px', weight: '600', ls: '0.02em', example: '*Price On 11/20/23' },
]

const SPACING = [
  { token: '100',  value: '4px',   label: 'Scale/100'  },
  { token: '200',  value: '8px',   label: 'Scale/200'  },
  { token: '300',  value: '12px',  label: 'Scale/300'  },
  { token: '400',  value: '16px',  label: 'Scale/400'  },
  { token: '500',  value: '20px',  label: 'Scale/500'  },
  { token: '600',  value: '24px',  label: 'Scale/600'  },
  { token: '700',  value: '28px',  label: 'Scale/700'  },
  { token: '800',  value: '32px',  label: 'Scale/800'  },
  { token: '900',  value: '40px',  label: 'Scale/900'  },
  { token: '1000', value: '48px',  label: 'Scale/1000' },
  { token: '1100', value: '64px',  label: 'Scale/1100' },
  { token: '1200', value: '80px',  label: 'Scale/1200' },
  { token: '1300', value: '96px',  label: 'Scale/1300' },
  { token: '1400', value: '120px', label: 'Scale/1400' },
]

// ─── Layout helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-semibold text-blue-900 mb-1" style={{ fontSize: 20, lineHeight: '26px' }}>
      {children}
    </h2>
  )
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-neutral-200 my-12" />
}

// ─── Figma-style variable panel ───────────────────────────────────────────────

function NameCell({ v }: { v: FigmaVariable }) {
  const swatchHex = v.hex ?? v.refHex
  const isNumber = v.number !== undefined || v.refValue !== undefined
  const isString = v.text !== undefined || v.refText !== undefined

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 shrink-0" style={{ width: 260 }}>
      {swatchHex ? (
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: swatchHex }}
        />
      ) : isNumber ? (
        <span className="w-3.5 h-3.5 inline-flex items-center justify-center text-[8px] font-mono font-semibold text-neutral-400 border border-neutral-300 rounded shrink-0">
          n
        </span>
      ) : isString ? (
        <span className="w-3.5 h-3.5 inline-flex items-center justify-center text-[8px] font-mono font-semibold text-neutral-400 border border-neutral-300 rounded shrink-0">
          Aa
        </span>
      ) : null}
      <span className="text-xs text-neutral-700 whitespace-nowrap">{v.name}</span>
    </div>
  )
}

function ValueCell({ v }: { v: FigmaVariable }) {
  if (v.hex) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2 border-l border-neutral-100 shrink-0" style={{ width: 260 }}>
        <div className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: v.hex }} />
        <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">{v.hex.replace('#', '')}</span>
      </div>
    )
  }
  if (v.number !== undefined) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2 border-l border-neutral-100 shrink-0" style={{ width: 260 }}>
        <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">{v.number}</span>
      </div>
    )
  }
  if (v.text !== undefined) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2 border-l border-neutral-100 shrink-0" style={{ width: 260 }}>
        <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">{v.text}</span>
      </div>
    )
  }
  if (v.ref) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 border-l border-neutral-100 shrink-0" style={{ width: 260 }}>
        {v.refHex && (
          <div className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: v.refHex }} />
        )}
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 max-w-full">
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-blue-500 shrink-0">
            <path d="M0 4 L8 4 M5 1 L8 4 L5 7" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="text-[10px] font-mono text-blue-700 whitespace-nowrap truncate">{v.ref}</span>
        </span>
      </div>
    )
  }
  return null
}

function CombinedFigmaVariablePanel({
  primitives,
  semantic,
}: {
  primitives: FigmaCollection
  semantic: FigmaCollection
}) {
  const [activeCollectionName, setActiveCollectionName] = useState<'Primitives' | 'Semantic'>('Primitives')
  const collection = activeCollectionName === 'Primitives' ? primitives : semantic
  const [activeGroup, setActiveGroup] = useState<string>(primitives.sidebarGroups[0].label)

  const handleSwitchCollection = (name: 'Primitives' | 'Semantic') => {
    setActiveCollectionName(name)
    const next = name === 'Primitives' ? primitives : semantic
    setActiveGroup(next.sidebarGroups[0].label)
  }

  const groupsToRender: FigmaGroup[] = collection.groupsByCategory[activeGroup] ?? []

  return (
    <div
      className="inline-flex rounded-lg border border-neutral-200 overflow-hidden bg-white align-top"
      style={{ minHeight: 480 }}
    >
      {/* ── Left sidebar ── */}
      <div className="w-48 shrink-0 bg-neutral-50 border-r border-neutral-200 flex flex-col">
        {/* Collections (clickable) */}
        <div className="px-3 pt-3 pb-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Collections</p>
          {([
            { label: 'Primitives' as const, count: primitives.collectionCount },
            { label: 'Semantic'   as const, count: semantic.collectionCount   },
          ]).map((c) => {
            const isActive = activeCollectionName === c.label
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => handleSwitchCollection(c.label)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs mb-0.5 transition-colors text-left ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-neutral-500 hover:bg-neutral-100'
                }`}
              >
                <span>{c.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-blue-400' : 'text-neutral-400'}`}>{c.count}</span>
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 mx-3 my-2" />

        {/* Groups (clickable, derived from active collection) */}
        <div className="px-3 flex-1 pb-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Groups</p>
          {collection.sidebarGroups.map((g) => {
            const isActive = activeGroup === g.label
            return (
              <button
                key={g.label}
                type="button"
                onClick={() => setActiveGroup(g.label)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs mb-0.5 transition-colors text-left ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-neutral-500 hover:bg-neutral-100'
                }`}
              >
                <span>{g.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-blue-400' : 'text-neutral-400'}`}>{g.count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Main table ── */}
      <div className="flex flex-col" style={{ width: 520 }}>
        {/* Column header */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 shrink-0">
          <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400" style={{ width: 260 }}>Name</div>
          <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 border-l border-neutral-200" style={{ width: 260 }}>Value</div>
        </div>

        {/* Groups + variable rows */}
        <div className="overflow-y-auto" style={{ maxHeight: 720 }}>
          {groupsToRender.length === 0 ? (
            <div className="px-4 py-10 text-center text-xs text-neutral-400">
              No variables in this group.
            </div>
          ) : (
            groupsToRender.map((group) => (
              <div key={group.label}>
                {/* Group header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                  <svg width="10" height="10" viewBox="0 0 10 10" className="text-neutral-400 shrink-0">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                  <span className="text-[11px] font-semibold text-neutral-500 whitespace-nowrap">{group.label}</span>
                </div>

                {/* Variable rows */}
                {group.vars.map((v) => (
                  <div key={v.name} className="flex items-center hover:bg-neutral-50 transition-colors border-b border-neutral-100">
                    <NameCell v={v} />
                    <ValueCell v={v} />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FoundationsPage() {
  return (
    <main className="min-h-screen bg-neutral-100">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-6 sm:px-10 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-2">
          Design Language System
        </p>
        <h1 className="font-semibold text-white" style={{ fontSize: 24, lineHeight: '30px' }}>
          Foundations · 2026
        </h1>
        <p className="text-blue-300 text-sm mt-2">
          Primitive &amp; semantic tokens — sourced from{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">Primitives.json</code>
          {' '}+{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">Semantic.json</code>
        </p>
      </header>

      <div className="px-6 sm:px-10 py-10 max-w-[1440px] mx-auto">

        {/* Demo notice */}
        <div className="mb-10 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Note:</span> This page is for demo only — a curated subset of variables across the two collections, not a full design-system token reference.
          </p>
        </div>

        {/* SECTION 1 — COLOR */}
        <section id="color" aria-labelledby="color-heading">
          <SectionLabel>Color</SectionLabel>
          <SectionHeading id="color-heading">Color Primitives</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            Primitive palette extracted from{' '}
            <code className="text-xs">Primitives.json</code>. Semantic role mappings from{' '}
            <code className="text-xs">Semantic.json</code>.
          </p>

          <div className="mb-8">
            <SubLabel>Blue Scale</SubLabel>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {BLUE_SCALE.map((c) => (
                <div key={c.shade}>
                  <div
                    className="w-full aspect-square rounded border border-black/10 mb-2"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-[11px] font-semibold text-neutral-700">Blue-{c.shade}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                  {c.semantic && (
                    <p className="text-[9px] text-blue-700 mt-0.5 leading-tight">{c.semantic}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SubLabel>Neutral Scale</SubLabel>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {NEUTRAL_SCALE.map((c) => (
                <div key={c.shade}>
                  <div
                    className="w-full aspect-square rounded border border-black/10 mb-2"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-[11px] font-semibold text-neutral-700">Neutral-{c.shade}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                  {c.semantic && (
                    <p className="text-[9px] text-neutral-500 mt-0.5 leading-tight">{c.semantic}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <SubLabel>Brand &amp; Feedback</SubLabel>
            <div className="bg-white rounded-lg border border-neutral-200 p-5">
              <div className="flex flex-wrap gap-6">
                {BRAND_COLORS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-700">{c.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">{c.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* SECTION 2 — TYPOGRAPHY */}
        <section id="typography" aria-labelledby="typography-heading">
          <SectionLabel>Typography</SectionLabel>
          <SectionHeading id="typography-heading">Type Scale</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            Font: <strong>Proxima Nova</strong> · Weights: Regular 400, Medium 500, Semibold 600
          </p>

          <div className="mb-8">
            <SubLabel>Headers</SubLabel>
            <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
              {TYPE_SCALE.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-8 text-[11px] font-semibold text-neutral-400 shrink-0">{t.label}</div>
                  <div
                    className="flex-1 font-semibold text-neutral-900"
                    style={{ fontSize: t.size, lineHeight: t.lineH }}
                  >
                    {t.example}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[10px] text-neutral-400 font-mono shrink-0">
                    <span>{t.size}/{t.lineH}</span>
                    <span>w{t.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SubLabel>Body Text</SubLabel>
            <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
              {BODY_SCALE.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-16 text-[11px] font-semibold text-neutral-400 shrink-0">{t.label}</div>
                  <div
                    className="flex-1 text-neutral-900"
                    style={{ fontSize: t.size, lineHeight: t.lineH, fontWeight: Number(t.weight) }}
                  >
                    {t.example}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[10px] text-neutral-400 font-mono shrink-0">
                    <span>{t.size}/{t.lineH}</span>
                    <span>w{t.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <SubLabel>Label Scale</SubLabel>
            <p className="text-xs text-neutral-400 mb-4">Used in product card titles, prices, badges, and UI labels throughout.</p>
            <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
              {LABEL_SCALE.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-28 text-[10px] font-mono text-neutral-400 shrink-0">{t.label}</div>
                  <div
                    className="flex-1 text-neutral-900"
                    style={{ fontSize: t.size, lineHeight: t.lineH, fontWeight: Number(t.weight), letterSpacing: t.ls }}
                  >
                    {t.example}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[10px] text-neutral-400 font-mono shrink-0">
                    <span>{t.size}/{t.lineH}</span>
                    <span>w{t.weight}</span>
                    <span>ls{t.ls}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* SECTION 3 — SPACING */}
        <section id="spacing" aria-labelledby="spacing-heading">
          <SectionLabel>Spacing</SectionLabel>
          <SectionHeading id="spacing-heading">Spacing Scale</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            14-step scale derived from{' '}
            <code className="text-xs">Scale/*</code> primitive tokens.
            Base unit: <strong>4px</strong>.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
            {SPACING.map((s) => (
              <div key={s.token} className="flex items-center gap-4 px-5 py-3">
                <div className="w-24 text-[11px] font-mono text-neutral-400 shrink-0">{s.label}</div>
                <div
                  className="bg-blue-500 rounded-sm shrink-0"
                  style={{ width: s.value, height: '12px', maxWidth: '320px' }}
                />
                <div className="text-xs font-semibold text-neutral-700 font-mono">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* SECTION 4 — VARIABLE PANEL (Figma-style, combined) */}
        <section id="variables" aria-labelledby="variables-heading">
          <SectionLabel>Variables</SectionLabel>
          <SectionHeading id="variables-heading">Token Reference (Figma view)</SectionHeading>
          <p className="text-sm text-neutral-500 mb-2">
            Mirrors the Figma{' '}
            <code className="text-xs">Variables</code> panel — values pulled from the{' '}
            <strong>Brand 1</strong> mode of the Multi-brands test file. Click a Collection or Group in the sidebar to filter the table.
          </p>
          <p className="text-xs text-neutral-400 mb-6">
            Semantic tokens{' '}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 align-middle">
              <svg width="8" height="8" viewBox="0 0 8 8" className="text-blue-500"><path d="M0 4 L8 4 M5 1 L8 4 L5 7" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
              <span className="text-[10px] font-mono text-blue-700">reference</span>
            </span>
            {' '}primitive variables (alias).
          </p>

          <div className="overflow-x-auto">
            <div style={{ minWidth: 720 }}>
              <CombinedFigmaVariablePanel primitives={PRIMITIVES} semantic={SEMANTIC} />
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-200 mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-neutral-400">
            Design Language System 2026 · Foundations · Primitives + Semantic
          </p>
        </footer>

      </div>
    </main>
  )
}
