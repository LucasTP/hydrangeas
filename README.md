# Hydrangeas

A simple CLI to generate file with React template.

## Table of contents

- [Install](#install)
- [Commands](#command)

## Install

```bash
npm i hydrangeas
```

## Commands

```bash
Usage: hydrangeas [options]

CLI for generating React components

Options:
  -V, --version                        Output the version number
  -L, --list [value]                   List all files in the current directory
  -G, --generate [option] [name]       Generate file base on option: page, components, redux
  -h, --help                           Display help for command
```

Generate Page

```bash
// base path: src
hydrangeas -g page pages/Rider
```
