export const site = {
  name: 'Ava Birtwistle',
  role: 'Software Engineering Student',
  minor: 'Computer Systems Minor',
  location: 'Victoria, BC',
  tagline: 'Building at the intersection of hardware and software.',
  email: 'ava.birtwistle@email.com',
  github: 'https://github.com/avabirtwistle',
  linkedin: 'https://ca.linkedin.com/in/avabirtwistle',
  resumeUrl: '/resume.pdf',
} as const;

export const scrollStatements = [
  'Real-time embedded systems',
  'FPGA & digital hardware',
  'Performance-critical software',
  'Hardware–software integration',
] as const;

export const about = {
  paragraphs: [
    'I am a Software Engineering student at the University of Victoria with a minor in Computer Systems, focused on real-time and performance-critical systems where code meets silicon.',
    'I have experience designing multi-component embedded software in C — execution behavior, timing constraints, and direct hardware interaction — plus coursework and projects in operating systems, computer architecture, digital hardware design, and signal processing.',
    'I am especially interested in FPGA-based hardware acceleration and high-level synthesis. Through co-ops and personal projects, I have built a solid understanding of how performance-critical workloads map from software to hardware.',
    'I am looking for a co-op where I can contribute on embedded, systems, or hardware-adjacent teams while continuing to grow as an engineer.',
  ],
} as const;

export const skills = [
  {
    category: 'Languages',
    items: ['C', 'C++', 'Python', 'Verilog', 'Assembly', 'VHDL basics'],
  },
  {
    category: 'Embedded & Hardware',
    items: ['Real-time systems', 'FPGA / Vivado', 'I²C / SPI / UART', 'Microprocessor systems', 'Digital signal processing', 'PCB design basics'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Linux', 'GCC / CMake', 'Oscilloscope & logic analyzer', 'High-level synthesis', 'Data systems & monitoring'],
  },
  {
    category: 'Software',
    items: ['Operating systems', 'Computer architecture', 'Algorithms & data structures', 'Database systems', 'Requirements engineering', 'Debugging'],
  },
] as const;

export const projects = [
  {
    title: 'CORDIC Vectoring (Fixed-Point)',
    year: '2026',
    description:
      'Fixed-point C implementation of vectoring-mode CORDIC for embedded systems — 15-iteration Q15 rotation using a precomputed arctangent table to convert (x, y) coordinates to magnitude and angle, with verification against floating-point math.',
    tags: ['C', 'Fixed-point', 'Embedded'],
    links: { github: 'https://github.com/avabirtwistle/CORDIC_embedded_system', demo: null },
  },
  {
    title: 'Activity-Guided Motion Estimation Encoder',
    year: '2026',
    description:
      'MATLAB block-based motion-compensated encoder for surveillance video — builds morphological activity masks to skip static blocks, runs full-search block matching on active regions only, and encodes residuals with DCT quantization. Compared dilation vs no-dilation on parking-lot footage.',
    tags: ['MATLAB', 'Video coding', 'Motion estimation'],
    links: { github: 'https://github.com/avabirtwistle/ece483', demo: null },
  },
  {
    title: '16-Bit Pipelined CPU',
    year: '2026',
    description:
      'Harvard-architecture 16-bit CPU in VHDL with fetch, decode, execute, memory, and writeback stages, pipeline registers, ALU, controller, register file, ROM/RAM, and Basys3 I/O — supports Format A, B, and L instructions with signed-overflow hazard handling.',
    tags: ['VHDL', 'FPGA', 'Computer architecture'],
    links: { github: 'https://github.com/avabirtwistle/ece449_final_project_refactored', demo: null },
  },
  {
    title: 'Hydroponic Nutrient PID Controller',
    year: '2025',
    description:
      'ESP32 FreeRTOS controller for GreenReach hydroponics — reads Atlas Scientific EC, pH, and RTD sensors over I²C, runs separate PID loops for nutrient dosing, drives peristaltic pumps via relay timers, and publishes telemetry over MQTT.',
    tags: ['C', 'ESP32', 'FreeRTOS', 'PID'],
    links: { github: null, demo: null },
  },
  {
    title: 'GreenReach Grower Dashboard',
    year: '2025',
    description:
      'Software and data systems for an urban hydroponic farm — real-time monitoring, environmental control, and grower-facing dashboards for nutrient and lighting optimization.',
    tags: ['Python', 'Embedded', 'Data systems'],
    links: { github: null, demo: null },
  },
  {
    title: 'STM32 Traffic Light System',
    year: '2025',
    description:
      'STM32F4 and FreeRTOS firmware simulating a one-lane intersection — ADC potentiometer input sets signal timing and vehicle spawn rate, shift-register GPIO drives LED vehicles and lights, and preemptive tasks coordinate light phases. Includes a custom Earliest-Deadline-First scheduler on FreeRTOS for timer-released periodic tasks and queue-based monitor telemetry.',
    tags: ['C', 'FreeRTOS', 'STM32', 'Real-time'],
    links: { github: null, demo: null },
  },
  {
    title: 'EV Charging Network Simulation',
    year: '2025',
    description:
      'Discrete-event Python simulation of EVs with random spawn positions, initial SoC, and target charge levels across three charging stations. Compares closest-station vs shortest-wait routing with balking and reneging over 100,000 replications per policy.',
    tags: ['Python', 'Simulation', 'Operations research'],
    links: { github: 'https://github.com/avabirtwistle/CSC446_finalproj', demo: null },
  },
] as const;

export const experience = [
  {
    title: 'Teaching Assistant',
    org: 'University of Victoria',
    period: 'Jan 2026 — Present',
    details:
      'Supporting undergraduate programming courses — lab instruction, assignment review, and helping students debug core CS concepts.',
  },
  {
    title: 'Club Member',
    org: 'CAV Club — Connected Autonomous Vehicles',
    period: 'Feb 2025 — Present',
    details:
      'Member of UVic’s Connected Autonomous Vehicles club — collaborative work on autonomous mini racing cars and real-time intelligent decision-making across hardware, software, and controls.',
  },
  {
    title: 'Software & Data Systems Developer',
    org: 'GreenReach Farms',
    period: 'Apr 2025 — Sep 2025',
    details:
      'Designed and built digital monitoring and control systems for an urban hydroponic farm — real-time micro-environment sensing, dynamic lighting, and nutrient optimization software.',
  },
  {
    title: 'IT Support Technician',
    org: 'RaceRocks',
    period: 'Sep 2023 — Sep 2024',
    details:
      'Provided technical support across systems management, troubleshooting, and infrastructure — three co-op terms in Victoria, BC.',
  },
  {
    title: 'B.Eng. Software Engineering',
    org: 'University of Victoria',
    period: '2021 — 2026',
    details:
      'Coursework in algorithms, operating systems, computer architecture, embedded systems, digital design, and real-time systems. Computer Systems minor.',
  },
] as const;

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;
