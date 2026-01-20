---
Title: Identity Document - OCR/MRZ KATA
date: 2024-08-21T00:00:00.000Z
summary: Kata medium/advanced level to practice TDD and Mocks (optional) in a real world algorithm.This kata consists in implementing an algorithm that translates an image of a DNI to a character string with structured information, and from this chain to parse it to an object with the DNI information.
images: [images/blog/mrz-feature.webp]
image: images/blog/mrz-feature.webp
feature_image: images/blog/mrz-feature.webp
with_reading_time: True
with_post_share: True
tags: [TDD, OCR, MRZ, KATA]
---

## Identity Document - OCR/MRZ KATA

Kata medium/advanced level to practice TDD and Mocks (optional) in a real world algorithm.This kata consists in implementing an algorithm that translates an image of a DNI to a character string with structured information, and from this chain to parse it to an object with the DNI information.

## What is OCR/MRZ?

The OCR/MRZ is a character optical recognition system that is used to read the data of the mechanical reading zone of an identity document.In the case of passports, the MRZ is the area at the bottom of the passport data page.

## Why use TDD?

- **Fast feedback**: TDD allows you to obtain immediate feedback on the code you are writing.

- **cleaner code**: TDD forces you to write clean and modular code.

- **Less errors**: TDD helps you detect errors before they become problems.

- **LIVING DOCUMENTATION**: Tests are a form of living documentation that describes how the code is expected to work.

## Remember the laws of TDD

1. Do not write Production Code unless it is to pass a failed test.
2. Do not write more than one unit test unless compilation fails.
3. Do not write more production code than necessary to pass the current unit test.

## Exercise

If you check your ID for a moment, you will see that the ring has a photo, your personal information, but the distribution of information is designed for a human being to understand it quickly, however, the back, has aMechanical Reading Zone (MRZ) which is a series of characters that contain the information of your DNI in a structured way.

The objective of this kata is that you write an algorithm that is able to read the information in the mechanical reading zone of a DNI and return an object with the structured information.

! [DNI] (/images/blog/mrz.jpg)

## Asunciones

We are going to assume that we have implemented a component that is able to read the image and parse the information to a character chain, for this you can use mocks, Faces or Dummy Objects, if you do not know very well how they work, I share a post that youExplain very well: [Mocks, Stubs, Spies and Fakes] ({{<ref "Fakes-Spies-Mocks-Stubs-Dummies.md">}})

## Requirements

** MrzimageService ** is the service that will be in charge of reading the information in the mechanical reading zone of a ID and returning the characters.

## Structure of a DNI

Here you have the structure of the information found in the mechanical reading zone of a ID, take a look, will help you to develop the algorithm.

### Input

![MRZ](/images/blog/mrz-2.png)

### Output

**'IDESPCAA000000499999999R<<<<<<\n8001014F3106028ESP<<<<<<<<<<<1\nESPANOLA<ESPANOLA<<CARMEN<<<<<\n'**

## Step 1 - The algorithm

Implement with step by step the logic necessary to read the information in the mechanical reading zone of a ID.

- DNI type
- DNI number
- Birthdate
- Sex
- Expiration date
- Nationality
- Last name
- Name

> Do not forget the corner case 🤗

## Step 2 - The service

Implement a service that is able to read the information in the mechanical reading zone of a DNI and return a character string with the values ​​in the image.
If you are using JavaScript, I can recommend this bookstore to read the image information: [Tesseract.js] (https://tesSeact.projectnaptha.com/) using the `traineddata` of` ocrb`.

If you have any questions, or would you like to make this kata together, do not hesitate to write to us.

Greetings 👋
