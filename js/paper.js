window.LABINSTRUCT_PAPER = {
  "abstract": "Self-driving laboratories (SDLs) aim to automate the full experimental loop, from scientific decision-making to physical execution. Ideally, AI-generated plans could be carried out directly by robotic systems, but reliable automation remains difficult in complex, open-world laboratory environments, where experiments often involve fine-grained manipulation, long-horizon procedures, and substantial variation across tasks and setups. Humans therefore remain an important execution interface between AI-generated plans and physical experiments, creating a need for clear and effective human-facing experimental guidance. Because laboratory procedures are inherently visual, spatial, and dynamic, video is particularly well suited to communicating apparatus configurations, manipulation actions, temporal dependencies, and state changes. Recent advances in video generation now make it possible to synthesize experimental demonstrations directly from an initial workspace image and a natural-language instruction. However, whether such models can reliably communicate real laboratory procedures has not been systematically studied. We introduce LabInstruct, a benchmark for situated instructional video generation in real laboratories. LabInstruct contains 204 tasks across 5 scientific disciplines, with real reference executions and structured annotations of objects, actions, contacts, and state transitions. Evaluating 8 frontier image-to-video models, we find that visually plausible generations frequently remain procedurally incorrect, revealing a substantial gap between visual realism and the reliability required for experimental instruction.",
  "evaluator": "GPT-5.6 Sol",
  "fps": 4,
  "source": "latex/iclr2027/iclr2027_conference.tex",
  "tables": [
    "tab:vlm",
    "tab:summary",
    "tab:vlm_human",
    "tab:summary_human",
    "tab:consensus_tiers"
  ],
  "breakdowns": {
    "discipline": [
      {
        "name": "Agronomy",
        "scores": {
          "L1": [
            27.0,
            53.2,
            31.5,
            34.2,
            18.4,
            57.0,
            36.4,
            34.2
          ],
          "L2": [
            5.9,
            13.4,
            17.5,
            18.4,
            3.2,
            49.3,
            38.3,
            35.3
          ],
          "Overall": [
            15.1,
            30.7,
            23.6,
            25.2,
            9.8,
            52.7,
            37.5,
            34.8
          ]
        }
      },
      {
        "name": "Biology",
        "scores": {
          "L1": [
            21.6,
            16.9,
            21.6,
            19.5,
            13.7,
            28.7,
            25.8,
            22.8
          ],
          "L2": [
            11.5,
            14.2,
            7.9,
            7.6,
            20.1,
            9.0,
            36.2,
            26.0
          ],
          "Overall": [
            16.1,
            15.4,
            14.1,
            13.0,
            17.2,
            18.0,
            31.5,
            24.5
          ]
        }
      },
      {
        "name": "Chemistry",
        "scores": {
          "L1": [
            60.5,
            17.7,
            39.4,
            28.7,
            28.7,
            69.7,
            45.4,
            53.9
          ],
          "L2": [
            18.2,
            24.4,
            18.9,
            13.5,
            24.9,
            41.0,
            48.2,
            49.7
          ],
          "Overall": [
            39.8,
            21.0,
            29.4,
            21.2,
            26.8,
            55.6,
            46.8,
            51.8
          ]
        }
      },
      {
        "name": "Materials Science",
        "scores": {
          "L1": [
            28.4,
            48.4,
            40.0,
            60.0,
            20.0,
            60.0,
            80.0,
            28.4
          ],
          "L2": [
            5.2,
            25.0,
            12.5,
            4.7,
            21.3,
            34.3,
            37.5,
            30.2
          ],
          "Overall": [
            14.1,
            34.0,
            23.0,
            26.0,
            20.8,
            44.1,
            53.8,
            29.5
          ]
        }
      },
      {
        "name": "Physics",
        "scores": {
          "L1": [
            36.8,
            16.6,
            10.6,
            31.4,
            17.9,
            54.1,
            44.3,
            58.2
          ],
          "L2": [
            16.8,
            29.0,
            17.4,
            25.0,
            19.8,
            56.9,
            63.3,
            55.5
          ],
          "Overall": [
            27.7,
            22.2,
            13.7,
            28.5,
            18.7,
            55.4,
            52.9,
            57.0
          ]
        }
      }
    ],
    "domain": [
      {
        "name": "Container Operations",
        "scores": {
          "L1": [
            76.0,
            48.8,
            71.4,
            34.2,
            24.0,
            84.3,
            70.0,
            52.9
          ],
          "L2": [
            16.7,
            20.0,
            9.3,
            15.9,
            20.3,
            29.3,
            51.7,
            36.2
          ],
          "Overall": [
            26.6,
            24.8,
            19.7,
            18.9,
            20.9,
            38.4,
            54.7,
            39.0
          ]
        }
      },
      {
        "name": "Filtration/Separation",
        "scores": {
          "L1": [
            66.6,
            47.3,
            0.0,
            0.0,
            26.6,
            33.3,
            0.0,
            0.0
          ],
          "L2": [
            28.4,
            28.4,
            54.7,
            0.0,
            38.0,
            38.0,
            60.0,
            60.0
          ],
          "Overall": [
            42.7,
            35.5,
            34.2,
            0.0,
            33.8,
            36.3,
            37.5,
            37.5
          ]
        }
      },
      {
        "name": "Heating/Cooling",
        "scores": {
          "L1": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            50.0,
            0.0,
            71.0
          ],
          "L2": [
            0.0,
            0.0,
            20.0,
            0.0,
            8.4,
            40.0,
            88.4,
            27.9
          ],
          "Overall": [
            0.0,
            0.0,
            14.2,
            0.0,
            6.0,
            42.8,
            63.1,
            40.2
          ]
        }
      },
      {
        "name": "Instrument Operations",
        "scores": {
          "L1": [
            54.9,
            18.0,
            25.8,
            32.4,
            21.2,
            55.2,
            49.1,
            52.8
          ],
          "L2": [
            16.3,
            25.4,
            19.8,
            21.5,
            21.2,
            57.3,
            57.7,
            47.4
          ],
          "Overall": [
            36.2,
            21.6,
            22.9,
            27.1,
            21.2,
            56.2,
            53.2,
            50.2
          ]
        }
      },
      {
        "name": "Liquid Handling",
        "scores": {
          "L1": [
            15.2,
            16.7,
            12.8,
            21.6,
            13.6,
            31.2,
            28.7,
            38.8
          ],
          "L2": [
            11.1,
            12.2,
            8.5,
            5.8,
            20.2,
            18.4,
            29.9,
            33.5
          ],
          "Overall": [
            12.8,
            14.1,
            10.3,
            12.5,
            17.4,
            23.8,
            29.4,
            35.7
          ]
        }
      },
      {
        "name": "Measurement",
        "scores": {
          "L1": [
            33.9,
            21.3,
            7.8,
            37.0,
            28.6,
            57.6,
            41.9,
            64.5
          ],
          "L2": [
            12.7,
            29.6,
            5.8,
            11.7,
            0.0,
            43.0,
            46.9,
            56.7
          ],
          "Overall": [
            23.0,
            25.6,
            6.8,
            24.0,
            13.8,
            50.1,
            44.4,
            60.4
          ]
        }
      },
      {
        "name": "Solid Handling",
        "scores": {
          "L1": [
            31.3,
            25.4,
            38.3,
            38.7,
            18.6,
            71.5,
            49.1,
            30.4
          ],
          "L2": [
            6.0,
            25.0,
            7.6,
            18.4,
            13.5,
            42.4,
            44.4,
            40.4
          ],
          "Overall": [
            16.2,
            25.2,
            20.0,
            26.6,
            15.5,
            54.2,
            46.3,
            36.3
          ]
        }
      }
    ],
    "viewpoint": [
      {
        "name": "First-Person",
        "scores": {
          "L1": [
            31.9,
            15.2,
            11.3,
            20.8,
            15.3,
            44.2,
            34.7,
            41.3
          ],
          "L2": [
            11.6,
            24.7,
            13.2,
            12.5,
            21.2,
            26.2,
            46.0,
            46.6
          ],
          "Overall": [
            20.7,
            20.5,
            12.4,
            16.2,
            18.6,
            34.3,
            41.0,
            44.2
          ]
        }
      },
      {
        "name": "Nearby Observer",
        "scores": {
          "L1": [
            41.3,
            25.0,
            28.9,
            33.9,
            21.9,
            57.6,
            45.0,
            48.3
          ],
          "L2": [
            14.8,
            20.7,
            16.3,
            17.6,
            18.0,
            46.4,
            49.4,
            40.5
          ],
          "Overall": [
            28.5,
            22.9,
            22.8,
            26.0,
            20.0,
            52.2,
            47.1,
            44.5
          ]
        }
      }
    ]
  },
  "models": [
    {
      "name": "Wan 2.2",
      "commercial": false,
      "tier": "T1",
      "meanRank": 4.67,
      "ranks": {"human": {"L1": 4, "L2": 4, "Overall": 4}, "vlm": {"L1": 4, "L2": 8, "Overall": 4}},
      "core": [
        93.7,
        59.4,
        79.0,
        90.1,
        76.2,
        89.8,
        37.3,
        58.2,
        84.3,
        60.0
      ],
      "summary": [
        76.2,
        44.0,
        97.0,
        93.0,
        38.5,
        60.0,
        17.4,
        98.0,
        95.1,
        13.6,
        25.9
      ],
      "human": {
        "core": [
          86.2,
          53.4,
          66.6,
          87.1,
          68.4,
          77.0,
          30.2,
          48.9,
          79.3,
          51.4
        ],
        "summary": [
          68.4,
          27.2,
          99.0,
          84.1,
          23.3,
          51.4,
          8.2,
          99.0,
          75.7,
          7.7,
          15.4
        ]
      }
    },
    {
      "name": "LTX 2.3",
      "commercial": false,
      "tier": "T2",
      "meanRank": 6.83,
      "ranks": {"human": {"L1": 8, "L2": 8, "Overall": 8}, "vlm": {"L1": 7, "L2": 4, "Overall": 6}},
      "core": [
        87.5,
        50.9,
        71.6,
        85.7,
        68.8,
        83.0,
        45.3,
        66.6,
        83.5,
        63.2
      ],
      "summary": [
        68.8,
        27.2,
        96.0,
        87.1,
        22.1,
        63.2,
        25.2,
        93.2,
        89.3,
        22.1,
        22.1
      ],
      "human": {
        "core": [
          56.6,
          43.6,
          57.2,
          73.5,
          53.5,
          40.9,
          24.1,
          47.7,
          70.4,
          39.7
        ],
        "summary": [
          53.5,
          7.4,
          93.0,
          73.2,
          5.3,
          39.7,
          0.9,
          91.2,
          72.8,
          0.7,
          3.0
        ]
      }
    },
    {
      "name": "Cosmos3 Nano",
      "commercial": false,
      "tier": "T2",
      "meanRank": 7.0,
      "ranks": {"human": {"L1": 7, "L2": 7, "Overall": 7}, "vlm": {"L1": 6, "L2": 7, "Overall": 8}},
      "core": [
        96.4,
        46.1,
        66.9,
        86.2,
        67.7,
        88.9,
        35.7,
        58.1,
        80.4,
        58.3
      ],
      "summary": [
        67.7,
        25.2,
        99.0,
        88.1,
        23.7,
        58.3,
        17.9,
        96.1,
        92.2,
        15.2,
        19.4
      ],
      "human": {
        "core": [
          86.0,
          40.7,
          56.0,
          77.8,
          59.3,
          61.5,
          20.4,
          40.7,
          69.8,
          40.9
        ],
        "summary": [
          59.3,
          12.8,
          99.0,
          79.2,
          10.4,
          40.9,
          1.4,
          98.0,
          69.9,
          1.3,
          5.8
        ]
      }
    },
    {
      "name": "Cosmos3 Super",
      "commercial": false,
      "tier": "T1",
      "meanRank": 5.17,
      "ranks": {"human": {"L1": 5, "L2": 5, "Overall": 5}, "vlm": {"L1": 5, "L2": 6, "Overall": 5}},
      "core": [
        94.8,
        51.7,
        71.3,
        86.0,
        71.0,
        90.8,
        37.1,
        57.5,
        83.3,
        59.5
      ],
      "summary": [
        71.0,
        32.1,
        98.0,
        96.0,
        30.0,
        59.5,
        17.4,
        97.0,
        95.1,
        15.7,
        22.8
      ],
      "human": {
        "core": [
          89.1,
          50.1,
          61.9,
          85.2,
          66.0,
          76.2,
          24.3,
          46.6,
          74.2,
          47.6
        ],
        "summary": [
          66.0,
          21.7,
          99.0,
          85.1,
          18.9,
          47.6,
          5.3,
          97.0,
          76.6,
          4.2,
          11.5
        ]
      }
    },
    {
      "name": "LingBot Video",
      "commercial": false,
      "tier": "T2",
      "meanRank": 6.33,
      "ranks": {"human": {"L1": 6, "L2": 6, "Overall": 6}, "vlm": {"L1": 8, "L2": 5, "Overall": 7}},
      "core": [
        92.7,
        48.0,
        67.8,
        85.8,
        68.2,
        88.7,
        39.9,
        61.7,
        83.6,
        61.7
      ],
      "summary": [
        68.2,
        23.2,
        100.0,
        92.0,
        20.0,
        61.7,
        22.3,
        99.0,
        95.1,
        19.1,
        19.5
      ],
      "human": {
        "core": [
          81.6,
          45.2,
          61.0,
          79.0,
          61.3,
          53.9,
          23.2,
          47.6,
          68.9,
          42.1
        ],
        "summary": [
          61.3,
          19.3,
          96.0,
          81.1,
          18.0,
          42.1,
          3.8,
          92.2,
          72.8,
          3.2,
          10.5
        ]
      }
    },
    {
      "name": "MiniMax H3",
      "commercial": false,
      "tier": "T0",
      "meanRank": 1.33,
      "ranks": {"human": {"L1": 1, "L2": 1, "Overall": 1}, "vlm": {"L1": 1, "L2": 3, "Overall": 1}},
      "core": [
        96.7,
        69.2,
        84.6,
        93.1,
        82.6,
        95.6,
        61.2,
        75.9,
        92.7,
        77.0
      ],
      "summary": [
        82.6,
        58.4,
        98.0,
        98.0,
        53.6,
        77.0,
        45.6,
        97.0,
        94.1,
        39.2,
        46.3
      ],
      "human": {
        "core": [
          95.5,
          70.9,
          80.2,
          93.5,
          81.6,
          94.6,
          63.8,
          74.6,
          93.2,
          77.3
        ],
        "summary": [
          81.6,
          51.9,
          100.0,
          98.0,
          49.7,
          77.3,
          43.6,
          99.0,
          92.2,
          39.0,
          44.3
        ]
      }
    },
    {
      "name": "Seedance 2.0",
      "commercial": true,
      "tier": "T0",
      "meanRank": 2.0,
      "ranks": {"human": {"L1": 2, "L2": 2, "Overall": 2}, "vlm": {"L1": 3, "L2": 1, "Overall": 2}},
      "core": [
        98.5,
        58.4,
        79.9,
        92.7,
        77.9,
        94.6,
        67.2,
        77.9,
        93.2,
        79.6
      ],
      "summary": [
        77.9,
        45.5,
        98.0,
        98.0,
        41.9,
        79.6,
        53.3,
        98.0,
        96.1,
        48.2,
        45.1
      ],
      "human": {
        "core": [
          91.5,
          70.5,
          77.2,
          90.5,
          79.1,
          90.1,
          60.5,
          69.3,
          93.2,
          73.9
        ],
        "summary": [
          79.1,
          50.9,
          100.0,
          97.0,
          48.5,
          73.9,
          39.3,
          100.0,
          96.1,
          37.7,
          43.0
        ]
      }
    },
    {
      "name": "Wan 3.0",
      "commercial": true,
      "tier": "T0",
      "meanRank": 2.67,
      "ranks": {"human": {"L1": 3, "L2": 3, "Overall": 3}, "vlm": {"L1": 2, "L2": 2, "Overall": 3}},
      "core": [
        98.1,
        66.8,
        83.1,
        93.7,
        81.6,
        95.7,
        67.4,
        80.3,
        93.7,
        80.3
      ],
      "summary": [
        81.6,
        50.9,
        98.0,
        93.0,
        46.2,
        80.3,
        52.9,
        88.3,
        94.1,
        42.7,
        44.4
      ],
      "human": {
        "core": [
          89.8,
          66.1,
          73.5,
          89.8,
          75.7,
          87.9,
          62.7,
          74.1,
          92.2,
          74.6
        ],
        "summary": [
          75.7,
          42.0,
          98.0,
          91.0,
          38.8,
          74.6,
          39.8,
          96.1,
          95.1,
          35.8,
          37.3
        ]
      }
    }
  ]
};
