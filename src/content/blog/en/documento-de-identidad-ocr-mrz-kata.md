---
title: ID Document - OCR/MRZ Kata
date: 2024-08-21T00:00:00.000Z
summary: A mid/advanced kata to practice TDD and optional mocks in a real-world algorithm. The kata consists of implementing an algorithm that converts an ID image into a character string with structured information, then parses that string into an object with the ID data.
images: [images/blog/mrz-feature.webp]
image: /images/blog/mrz-feature.webp
tags: [tdd, ocr, mrz, kata]
---

## ID Document - OCR/MRZ Kata

A mid/advanced kata to practice TDD and optional mocks in a real-world algorithm. This kata consists of implementing an algorithm that converts an ID image into a character string with structured information, then parses that string into an object with the ID data.

## What is OCR/MRZ?

OCR/MRZ is an optical character recognition system used to read data from the machine-readable zone of an identity document. In the case of passports, the MRZ is the section at the bottom of the passport data page.

## Why use TDD?

- **Fast feedback**: TDD lets you get immediate feedback on the code you are writing.
- **Cleaner code**: TDD forces you to write clean, modular code.
- **Fewer bugs**: TDD helps catch errors before they become problems.
- **Living documentation**: Tests are living documentation that describe how the code is expected to work.

## Remember the laws of TDD

1. Don’t write production code unless it is to make a failing test pass.
2. Don’t write more than one unit test unless the compiler fails.
3. Don’t write more production code than necessary to pass the current unit test.

## Exercise

If you take a moment to look at your ID card, you will see that the front has a photo and personal details designed for human readability. However, the back has a machine-readable zone (MRZ), a series of characters containing the ID information in a structured format.

The goal of this kata is to write an algorithm that can read the information from the machine-readable zone of an ID and return an object with the structured data.

![DNI](/images/blog/mrz.jpg)

## Assumptions

Let’s assume we have implemented a component that can read the image and parse the information into a string. For this, you can use mocks, fakes, or dummy objects. If you are not sure how they work, I share a post that explains it well: [Mocks, Stubs, Spies and Fakes]({{< ref "fakes-spies-mocks-stubs-dummies.md" >}})

## Requirements

**MRZImageService** is the service responsible for reading information from a photo of an ID’s machine-readable zone and returning the resulting string.

## Spanish ID MRZ structure

Here is the structure of the information found in the machine-readable zone of a Spanish ID. Take a look at it, it will help you develop the algorithm.

![MRZ](/images/blog/mrz-1.png)

## Clarifications

### MRZImageService input

![MRZ](/images/blog/mrz-2.png)

### MRZImageService output

**'IDESPCAA000000499999999R<<<<<<\n8001014F3106028ESP<<<<<<<<<<<1\nESPANOLA<ESPANOLA<<CARMEN<<<<<\n'**

### Algorithm input

**'IDESPCAA000000499999999R<<<<<<\n8001014F3106028ESP<<<<<<<<<<<1\nESPANOLA<ESPANOLA<<CARMEN<<<<<\n'**

### Algorithm output

```json
{
  "type": "DNI",
  "id": "00000049",
  "dob": "01/01/1980",
  "sex": "F",
  "exp": "28/06/2031",
  "country": "ESP",
  "surname": "ESPANOLA ESPANOLA",
  "name": "CARMEN"
}
```

## Step 1 - The Algorithm

Implement the logic step by step with TDD to read information from the machine-readable zone of an ID.

- ID type
- ID number
- Date of birth
- Sex
- Expiration date
- Nationality
- Surname
- Name

> Don’t forget the corner cases 🤗

## Step 2 - The Service

Implement a service that can read the information from the machine-readable zone of an ID and return a string with the values extracted from the image.
If you are using JavaScript, I recommend the library [tesseract.js](https://tesseract.projectnaptha.com/) together with the `ocrb` traineddata.

If you have any questions or would like to work through this kata together, feel free to write to us.

Best regards 👋
