#include "stdafx.h"
#include "CppUnitTest.h"
#include <time.h>
#include <Windows.h>
#include <StrSafe.h>
#include "FrameTranslator.h"
#include "BaseCardElement.h"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace AdaptiveCards;
using namespace std;

namespace AdaptiveCardsSharedModelUnitTest
{
    TEST_CLASS(FrameTranslatorTests)
    {
    public:
        TEST_METHOD(AAFrameTranslatorTest)
        {
            std::string testSource =
                "{\
                \"$schema\":\"http://adaptivecards.io/schemas/adaptive-card.json\",\
                \"type\": \"AdaptiveCard\",\
                \"version\": \"1.0\",\
                \"body\": [\
                    {\
                        \"type\": \"TextBlock\",\
                        \"text\": \"This is the body\"\
                    }\
                ],\
                \"actions\":[\
		            {\
                    \"type\": \"Action.Submit\",\
                    \"title\" : \"Action\"\
                    },\
                    {\
                    \"type\": \"Action.Submit\",\
                    \"title\" : \"Set\"\
                    }\
                ]\
            }";

            std::string testFrame =
                "{\
                \"$schema\":\"http://adaptivecards.io/schemas/adaptive-card.json\",\
                \"type\" : \"AdaptiveCard\",\
                \"version\" : \"1.0\",\
                \"body\" : [\
                {\
                    \"type\": \"Container\",\
                    \"items\" : \"${body}\"\
                },\
                {\
                    \"type\": \"ActionSet\",\
                    \"actions\" : \"${actions}\"\
                }\
                ]\
            }";

            std::string expectedResultString =
                "{\
                \"$schema\":\"http://adaptivecards.io/schemas/adaptive-card.json\",\
                \"type\" : \"AdaptiveCard\",\
                \"version\" : \"1.0\",\
                \"body\" : [\
                {\
                    \"type\": \"Container\",\
                    \"items\" : [\
                    {\
                        \"type\": \"TextBlock\",\
                        \"text\": \"This is the body\"\
                    }\
                ]},\
                {\
                    \"type\": \"ActionSet\",\
                    \"actions\" : [\
		                {\
                        \"type\": \"Action.Submit\",\
                        \"title\" : \"Action\"\
                        },\
                        {\
                        \"type\": \"Action.Submit\",\
                        \"title\" : \"Set\"\
                        }\
                    ]\
                }\
                ]\
            }";

            Json::Value soureCardJson = ParseUtil::GetJsonValueFromString(testSource);
            Json::Value frameJson = ParseUtil::GetJsonValueFromString(testFrame);

            Json::Value result;
            ApplyFrame(soureCardJson, frameJson, result);

            Json::FastWriter fastWriter;
            std::string resultString = fastWriter.write(result);

            Json::Value expectedJson = ParseUtil::GetJsonValueFromString(expectedResultString);
            expectedResultString = fastWriter.write(expectedJson);

            Assert::AreEqual(expectedResultString, resultString);
        }
    };
}
