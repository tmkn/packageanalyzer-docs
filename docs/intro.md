---
sidebar_position: 1
title: Intro
---

# Welcome to the packageanalyzer

![](https://raw.githubusercontent.com/tmkn/packageanalyzer/master/banner.png)

## What?

_A framework to introspect Node.js packages_

In a nutshell the packageanalyzer collects all metadata (typically the package.json) for the whole dependency tree.

Additionally it also provides functionality to collect any extra data along the way.

It then provides utility functions to query all that data.

## Why?

Mainly security concerns.

Today Node.js is one of the most popular runtimes but that also makes it a popular target but security related aspects are not easily surfaced (as they imo should be) when dealing with Node.js packages.

- What am I installing exactly when I add this package?
- What exactly changed in this new version? (maintainer change?, new dependency?)
- Does it have a postinstall script?
- Can this package be replaced by native Node.js modules, minimizing the risk of a hostile maintainer change?
- Am I using a deprecated package? Is there an alternative?
- Does it use eval in the source code or other suspicious code fragments?
- Is there an update available?
  etc.

But I also wanted to answer questions like

- Am I license compliant?
- Does this package support ES modules?
- What is the oldest dependency?
  etc.

While those are very different questions, and how you answer them differ each time, they all deal with the dependency tree. So the packageanalyzer is meant to act as a foundation by providing utility functions to traverse and collect data from the dependency tree to help answer questions like that all while being completely open source.

## How?

Please refer to `Core Concepts` section for a more indepth explanation
